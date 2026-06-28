import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AudioPlayer } from '@mediagrid/capacitor-native-audio';

/** Métadonnées optionnelles affichées sur l'écran verrouillé (notif / MediaSession). */
export interface AudioMetadata {
  title?: string;
  artist?: string;
  artwork?: string;
}

/** API commune aux deux backends de lecture (web HTML5 et natif Capacitor). */
interface AudioPlayerStrategy {
  playAudio(mediaUrl: string, metadata?: AudioMetadata): void;
  resumeAudio(): void;
  pauseAudio(): void;
  seekTo(position: number): void;
  getCurrentPosition(): Promise<number>;
  getDuration(): number;
}

/**
 * Lecteur audio podcast.
 *
 * Sélectionne le backend selon la plateforme :
 * - natif (Android/iOS via Capacitor) → plugin `@mediagrid/capacitor-native-audio`,
 *   qui gère le streaming d'une URL distante, la lecture en arrière-plan et la
 *   notification / écran verrouillé.
 * - web / PWA → élément HTML5 `<audio>` + API MediaSession.
 *
 * L'API publique est strictement identique pour les deux backends : les appelants
 * (`PodcastPlayerService`, `ArticleAudioReaderComponent`) ne savent pas lequel
 * tourne.
 */
@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService implements AudioPlayerStrategy {
  private readonly strategy: AudioPlayerStrategy = Capacitor.isNativePlatform()
    ? new NativeAudioPlayer()
    : new WebAudioPlayer();

  public playAudio(mediaUrl: string, metadata?: AudioMetadata): void {
    this.strategy.playAudio(mediaUrl, metadata);
  }

  public resumeAudio(): void {
    this.strategy.resumeAudio();
  }

  public pauseAudio(): void {
    this.strategy.pauseAudio();
  }

  public seekTo(position: number): void {
    this.strategy.seekTo(position);
  }

  public getCurrentPosition(): Promise<number> {
    return this.strategy.getCurrentPosition();
  }

  public getDuration(): number {
    return this.strategy.getDuration();
  }
}

/**
 * Backend natif basé sur `@mediagrid/capacitor-native-audio`.
 *
 * Le plugin est asynchrone et orienté évènements : on `create` la source, on
 * attend `onAudioReady` avant de lire et de connaître la durée. On préserve
 * l'API publique synchrone en mémorisant la durée et en lançant les appels
 * natifs en fire-and-forget.
 *
 * La lecture en arrière-plan et les contrôles écran verrouillé exigent
 * `useForNotification: true` (config faite ci-dessous) et, côté natif,
 * `UIBackgroundModes: audio` (iOS) + le foreground service audio (Android),
 * qui relèvent des projets natifs.
 */
class NativeAudioPlayer implements AudioPlayerStrategy {
  private audioId?: string;
  private duration = 0;

  public playAudio(mediaUrl: string, metadata?: AudioMetadata): void {
    void this.start(mediaUrl, metadata);
  }

  public resumeAudio(): void {
    if (!this.audioId) {
      console.warn('No audio currently paused');
      return;
    }
    AudioPlayer.play({ audioId: this.audioId }).catch((error) =>
      console.error('Audio resume failed', error)
    );
  }

  public pauseAudio(): void {
    if (!this.audioId) {
      return;
    }
    AudioPlayer.pause({ audioId: this.audioId }).catch((error) =>
      console.error('Audio pause failed', error)
    );
  }

  public seekTo(position: number): void {
    if (!this.audioId) {
      console.warn('No audio to seek');
      return;
    }
    AudioPlayer.seek({ audioId: this.audioId, timeInSeconds: position }).catch((error) =>
      console.error('Audio seek failed', error)
    );
  }

  public async getCurrentPosition(): Promise<number> {
    if (!this.audioId) {
      return 0;
    }
    try {
      const { currentTime } = await AudioPlayer.getCurrentTime({ audioId: this.audioId });
      return currentTime;
    } catch (error) {
      console.error('Audio getCurrentTime failed', error);
      return 0;
    }
  }

  public getDuration(): number {
    return this.duration;
  }

  private async start(mediaUrl: string, metadata?: AudioMetadata): Promise<void> {
    await this.release();

    const audioId = `athena-audio-${Date.now()}`;
    this.audioId = audioId;
    this.duration = 0;

    try {
      await AudioPlayer.create({
        audioId,
        audioSource: mediaUrl,
        friendlyTitle: metadata?.title ?? 'Athena',
        albumTitle: metadata?.artist,
        artistName: metadata?.artist,
        artworkSource: metadata?.artwork,
        useForNotification: true,
      });

      await AudioPlayer.onAudioReady({ audioId }, () => {
        AudioPlayer.getDuration({ audioId })
          .then(({ duration }) => {
            this.duration = duration;
          })
          .catch((error) => console.error('Audio getDuration failed', error));
        AudioPlayer.play({ audioId }).catch((error) =>
          console.error('Audio play failed', error)
        );
      });

      console.log('Starting to play ' + mediaUrl);
      await AudioPlayer.initialize({ audioId });
    } catch (error) {
      console.error('Native audio setup failed', error);
    }
  }

  private async release(): Promise<void> {
    if (!this.audioId) {
      return;
    }
    const previousId = this.audioId;
    this.audioId = undefined;
    this.duration = 0;
    try {
      await AudioPlayer.destroy({ audioId: previousId });
    } catch (error) {
      console.error('Audio destroy failed', error);
    }
  }
}

/**
 * Backend web basé sur l'élément HTML5 `<audio>` + l'API MediaSession.
 *
 * Aucune dépendance native : tourne en PWA et en fallback navigateur. Les
 * contrôles écran verrouillé / casque passent par MediaSession.
 */
class WebAudioPlayer implements AudioPlayerStrategy {
  private audio?: HTMLAudioElement;

  public playAudio(mediaUrl: string, metadata?: AudioMetadata): void {
    this.releaseAudioPlayer();

    const audio = new Audio(mediaUrl);
    audio.preload = 'auto';
    this.audio = audio;

    this.setupMediaSession(metadata);

    console.log('Starting to play ' + mediaUrl);
    audio.play().catch((error) => console.error('Audio play failed', error));
  }

  public resumeAudio(): void {
    if (!this.audio) {
      console.warn('No audio currently paused');
      return;
    }
    console.log('Resume playing');
    this.audio.play().catch((error) => console.error('Audio resume failed', error));
  }

  public pauseAudio(): void {
    console.log('Playing paused');
    this.audio?.pause();
  }

  public seekTo(position: number): void {
    if (!this.audio) {
      console.warn('No audio to seek');
      return;
    }
    console.log(`Seeking to position ${position}`);
    this.audio.currentTime = position; // en secondes
  }

  public async getCurrentPosition(): Promise<number> {
    return this.audio?.currentTime ?? 0;
  }

  public getDuration(): number {
    const duration = this.audio?.duration;
    return duration && Number.isFinite(duration) ? duration : 0;
  }

  private setupMediaSession(metadata?: AudioMetadata): void {
    if (!('mediaSession' in navigator) || !this.audio) {
      return;
    }
    const audio = this.audio;

    if (metadata?.title) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: metadata.title,
        artist: metadata.artist ?? 'Athena',
        artwork: metadata.artwork
          ? [{ src: metadata.artwork, sizes: '512x512', type: 'image/jpeg' }]
          : [],
      });
    }

    navigator.mediaSession.setActionHandler('play', () => {
      audio.play().catch((error) => console.error('Audio play failed', error));
    });
    navigator.mediaSession.setActionHandler('pause', () => audio.pause());
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.seekTime != null) {
        audio.currentTime = details.seekTime;
      }
    });
    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
      audio.currentTime = Math.max(0, audio.currentTime - (details.seekOffset ?? 10));
    });
    navigator.mediaSession.setActionHandler('seekforward', (details) => {
      const limit = Number.isFinite(audio.duration) ? audio.duration : audio.currentTime + 10;
      audio.currentTime = Math.min(limit, audio.currentTime + (details.seekOffset ?? 10));
    });
  }

  private releaseAudioPlayer(): void {
    if (!this.audio) {
      return;
    }
    this.audio.pause();
    this.audio.src = '';
    this.audio.load();
    this.audio = undefined;
  }
}

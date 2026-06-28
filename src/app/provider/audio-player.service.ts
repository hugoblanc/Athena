import { Injectable } from '@angular/core';

/** Métadonnées optionnelles affichées sur l'écran verrouillé (MediaSession). */
export interface AudioMetadata {
  title?: string;
  artist?: string;
  artwork?: string;
}

/**
 * Lecteur audio basé sur l'élément HTML5 `<audio>` + l'API MediaSession.
 *
 * Remplace l'ancien plugin Cordova `media` (fragile, cassé à chaque montée de
 * version native). Aucune dépendance native : le même code tourne en PWA et
 * dans le shell Capacitor. Les contrôles écran verrouillé / casque passent par
 * MediaSession ; la lecture en arrière-plan iOS exige `UIBackgroundModes: audio`
 * (Info.plist) + l'activation de l'`AVAudioSession` en mode lecture (AppDelegate).
 */
@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private audio?: HTMLAudioElement;

  public playAudio(mediaUrl: string, metadata?: AudioMetadata) {
    this.releaseAudioPlayer();

    const audio = new Audio(mediaUrl);
    audio.preload = 'auto';
    this.audio = audio;

    this.setupMediaSession(metadata);

    console.log('Starting to play ' + mediaUrl);
    audio.play().catch((error) => console.error('Audio play failed', error));
  }

  public resumeAudio() {
    if (!this.audio) {
      console.warn('No audio currently paused');
      return;
    }
    console.log('Resume playing');
    this.audio.play().catch((error) => console.error('Audio resume failed', error));
  }

  public pauseAudio() {
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

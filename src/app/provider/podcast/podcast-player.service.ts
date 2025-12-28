import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Podcast } from '../../models/podcast/podcast.model';
import { AudioPlayerService } from '../audio-player.service';

export enum PlayerState {
  IDLE = 'idle',
  PLAYING = 'playing',
  PAUSED = 'paused',
  LOADING = 'loading'
}

@Injectable({
  providedIn: 'root'
})
export class PodcastPlayerService {
  private currentPodcastSubject = new BehaviorSubject<Podcast | null>(null);
  private playerStateSubject = new BehaviorSubject<PlayerState>(PlayerState.IDLE);
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private durationSubject = new BehaviorSubject<number>(0);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  public currentPodcast$: Observable<Podcast | null> = this.currentPodcastSubject.asObservable();
  public playerState$: Observable<PlayerState> = this.playerStateSubject.asObservable();
  public currentTime$: Observable<number> = this.currentTimeSubject.asObservable();
  public duration$: Observable<number> = this.durationSubject.asObservable();
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  private progressInterval?: number;

  constructor(private readonly audioPlayer: AudioPlayerService) {}

  async play(podcast: Podcast): Promise<void> {
    this.isLoadingSubject.next(true);
    this.currentPodcastSubject.next(podcast);

    try {
      this.audioPlayer.playAudio(podcast.audioUrl);
      this.playerStateSubject.next(PlayerState.PLAYING);

      // Wait a bit for audio to load and get duration
      setTimeout(() => {
        const duration = this.audioPlayer.getDuration();
        if (duration > 0) {
          this.durationSubject.next(duration);
        } else if (podcast.duration) {
          this.durationSubject.next(podcast.duration);
        }
        this.isLoadingSubject.next(false);
        this.startProgressTracking();
      }, 1000);
    } catch (error) {
      console.error('Error playing podcast:', error);
      this.isLoadingSubject.next(false);
      this.playerStateSubject.next(PlayerState.IDLE);
    }
  }

  pause(): void {
    this.audioPlayer.pauseAudio();
    this.playerStateSubject.next(PlayerState.PAUSED);
    this.stopProgressTracking();
  }

  resume(): void {
    this.audioPlayer.resumeAudio();
    this.playerStateSubject.next(PlayerState.PLAYING);
    this.startProgressTracking();
  }

  seekTo(seconds: number): void {
    this.audioPlayer.seekTo(seconds);
    this.currentTimeSubject.next(seconds);
  }

  async getCurrentPosition(): Promise<number> {
    return this.audioPlayer.getCurrentPosition();
  }

  private startProgressTracking(): void {
    this.stopProgressTracking();

    this.progressInterval = window.setInterval(async () => {
      if (this.playerStateSubject.value === PlayerState.PLAYING) {
        const position = await this.audioPlayer.getCurrentPosition();
        this.currentTimeSubject.next(position);
      }
    }, 1000);
  }

  private stopProgressTracking(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = undefined;
    }
  }

  getCurrentPodcast(): Podcast | null {
    return this.currentPodcastSubject.value;
  }

  getPlayerState(): PlayerState {
    return this.playerStateSubject.value;
  }
}

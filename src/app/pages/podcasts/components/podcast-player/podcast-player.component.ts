import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Share } from '@capacitor/share';
import { Podcast } from '../../../../models/podcast/podcast.model';
import { PodcastPlayerService, PlayerState } from '../../../../provider/podcast/podcast-player.service';
import { PodcastService } from '../../../../provider/podcast/podcast.service';

@Component({
  selector: 'app-podcast-player',
  templateUrl: './podcast-player.component.html',
  styleUrls: ['./podcast-player.component.scss'],
})
export class PodcastPlayerComponent implements OnInit, OnDestroy {
  @Input() podcast!: Podcast;
  @Output() close = new EventEmitter<void>();

  isPlaying = false;
  currentTime = 0;
  duration = 0;
  isLoading = false;
  nextPodcast: Podcast | null = null;
  previousPodcast: Podcast | null = null;

  constructor(
    private readonly playerService: PodcastPlayerService,
    private readonly podcastService: PodcastService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.subscribeToPlayerState();
    this.playerService.play(this.podcast);
    this.loadNextPodcast();
    this.loadPreviousPodcast();
  }

  ngOnDestroy() {
    // Don't stop playback when component is destroyed
    // User might want to continue listening in background
  }

  private subscribeToPlayerState() {
    this.playerService.playerState$.subscribe(state => {
      this.isPlaying = state === PlayerState.PLAYING;
    });

    this.playerService.currentTime$.subscribe(time => {
      this.currentTime = time;
    });

    this.playerService.duration$.subscribe(dur => {
      this.duration = dur;
    });

    this.playerService.isLoading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.playerService.pause();
    } else {
      this.playerService.resume();
    }
  }

  onSeek(event: any) {
    const newPosition = parseFloat(event.target.value);
    this.playerService.seekTo(newPosition);
  }

  async sharePodcast() {
    try {
      await Share.share({
        title: this.podcast.content.title,
        text: `Écoute ce podcast sur Athena\n${this.podcast.content.title}\n\nhttps://athena-app.xyz/podcast/${this.podcast.id}`,
        dialogTitle: 'Partager le podcast'
      });
    } catch (error) {
      console.error('Error sharing podcast:', error);
    }
  }

  onClose() {
    this.close.emit();
  }

  getProgressPercentage(): number {
    if (this.duration === 0) {
      return 0;
    }
    return (this.currentTime / this.duration) * 100;
  }

  getPodcastImage(): string {
    console.log('Podcast image data:', this.podcast.content.image);
    console.log('Fallback logo:', this.podcast.content.meta_media.logo);
    return this.podcast.content.image?.url || this.podcast.content.meta_media.logo;
  }

  private loadNextPodcast() {
    this.podcastService.getNextPodcast(this.podcast.id).subscribe({
      next: (nextPodcast) => {
        this.nextPodcast = nextPodcast;
      },
      error: () => {
        this.nextPodcast = null;
      }
    });
  }

  private loadPreviousPodcast() {
    this.podcastService.getPreviousPodcast(this.podcast.id).subscribe({
      next: (previousPodcast) => {
        this.previousPodcast = previousPodcast;
      },
      error: () => {
        this.previousPodcast = null;
      }
    });
  }

  goToNextPodcast() {
    if (this.nextPodcast) {
      this.playerService.play(this.nextPodcast);
      this.podcast = this.nextPodcast;
      this.loadNextPodcast();
      this.loadPreviousPodcast();
    }
  }

  goToPreviousPodcast() {
    if (this.previousPodcast) {
      this.playerService.play(this.previousPodcast);
      this.podcast = this.previousPodcast;
      this.loadNextPodcast();
      this.loadPreviousPodcast();
    }
  }

  navigateToArticle() {
    const mediaKey = this.podcast.content.meta_media.key;
    const contentId = this.podcast.content.contentId;
    this.router.navigate(['/media', mediaKey, 'details', contentId]);
    this.onClose();
  }
}

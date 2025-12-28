import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Share } from '@capacitor/share';
import { Podcast } from '../../../../models/podcast/podcast.model';
import { PodcastPlayerService, PlayerState } from '../../../../provider/podcast/podcast-player.service';

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

  constructor(private readonly playerService: PodcastPlayerService) {}

  ngOnInit() {
    this.subscribeToPlayerState();
    this.playerService.play(this.podcast);
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
        text: `Écoute ce podcast sur Athena`,
        url: `https://athena-app.xyz/podcast/${this.podcast.id}`,
        dialogTitle: 'Partager le podcast'
      });
    } catch (error) {
      console.error('Error sharing podcast:', error);
    }
  }

  onClose() {
    this.close.emit();
  }
}

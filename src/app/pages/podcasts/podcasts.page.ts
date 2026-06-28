import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Podcast } from '../../models/podcast/podcast.model';
import { PodcastService } from '../../provider/podcast/podcast.service';
import { SecondaryMenuService } from '../../provider/secondary-menu.service';

/** Classe posée sur <body> quand le player plein écran est ouvert : masque la
 *  tab bar (qui vit dans le shell parent) pour un vrai Now Playing plein écran. */
const PLAYER_OPEN_CLASS = 'podcast-player-open';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.page.html',
  styleUrls: ['./podcasts.page.scss'],
})
export class PodcastsPage implements OnInit, OnDestroy {
  podcasts: Podcast[] = [];
  isLoading = false;
  currentPage = 1;
  pageSize = 10;
  hasMoreData = true;
  selectedPodcast: Podcast | null = null;

  constructor(
    private readonly podcastService: PodcastService,
    private readonly route: ActivatedRoute,
    private readonly secondaryMenu: SecondaryMenuService
  ) {}

  openMoreMenu() {
    this.secondaryMenu.open();
  }

  ngOnInit() {
    this.loadPodcasts();

    // Check if we need to load a specific podcast from query params
    this.route.queryParams.subscribe(params => {
      if (params['contentId']) {
        this.loadPodcastByContentId(+params['contentId']);
      }
    });
  }

  loadPodcasts(event?: any) {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.podcastService.getPodcasts(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.podcasts = [...this.podcasts, ...response.data];
        this.hasMoreData = response.meta.page < response.meta.totalPages;
        this.isLoading = false;

        if (event) {
          event.target.complete();
        }
      },
      error: (error) => {
        console.error('Error loading podcasts:', error);
        this.isLoading = false;
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  ngOnDestroy() {
    // Filet de sécurité : ne jamais laisser la tab bar masquée si on quitte la page.
    this.setPlayerOpen(false);
  }

  loadPodcastByContentId(contentId: number) {
    this.podcastService.getPodcastByContentId(contentId).subscribe({
      next: (podcast) => {
        if (podcast) {
          this.selectedPodcast = podcast;
          this.setPlayerOpen(true);
        }
      },
      error: (error) => {
        console.error('Error loading podcast by content ID:', error);
      }
    });
  }

  onPodcastClick(podcast: Podcast) {
    this.selectedPodcast = podcast;
    this.setPlayerOpen(true);
  }

  onPlayerClose() {
    this.selectedPodcast = null;
    this.setPlayerOpen(false);
  }

  private setPlayerOpen(open: boolean) {
    document.body.classList.toggle(PLAYER_OPEN_CLASS, open);
  }

  loadMore(event: any) {
    if (!this.hasMoreData) {
      event.target.complete();
      return;
    }

    this.currentPage++;
    this.loadPodcasts(event);
  }

  doRefresh(event: any) {
    this.podcasts = [];
    this.currentPage = 1;
    this.hasMoreData = true;
    this.loadPodcasts(event);
  }
}

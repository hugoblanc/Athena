import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Podcast } from '../../models/podcast/podcast.model';
import { PodcastService } from '../../provider/podcast/podcast.service';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.page.html',
  styleUrls: ['./podcasts.page.scss'],
})
export class PodcastsPage implements OnInit {
  podcasts: Podcast[] = [];
  isLoading = false;
  currentPage = 1;
  pageSize = 10;
  hasMoreData = true;
  selectedPodcast: Podcast | null = null;

  constructor(
    private readonly podcastService: PodcastService,
    private readonly route: ActivatedRoute
  ) {}

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

  loadPodcastByContentId(contentId: number) {
    this.podcastService.getPodcastByContentId(contentId).subscribe({
      next: (podcast) => {
        if (podcast) {
          this.selectedPodcast = podcast;
        }
      },
      error: (error) => {
        console.error('Error loading podcast by content ID:', error);
      }
    });
  }

  onPodcastClick(podcast: Podcast) {
    this.selectedPodcast = podcast;
  }

  onPlayerClose() {
    this.selectedPodcast = null;
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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Podcast, PodcastListResponse } from '../../models/podcast/podcast.model';
import { HttpService } from '../helper/http.service';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {
  private static readonly BASE_URL = environment.apiUrl + 'podcast';

  constructor(private readonly http: HttpService) {}

  getPodcasts(page: number = 1, size: number = 10, terms?: string): Observable<PodcastListResponse> {
    let url = `${PodcastService.BASE_URL}/list?page=${page}&size=${size}`;
    if (terms) {
      url += `&terms=${encodeURIComponent(terms)}`;
    }
    return this.http.get<PodcastListResponse>(url);
  }

  getPodcastByContentId(contentId: number): Observable<Podcast | null> {
    return this.http.get<Podcast | null>(`${PodcastService.BASE_URL}/content/${contentId}`);
  }

  getPodcastById(id: number): Observable<Podcast> {
    return this.http.get<Podcast>(`${PodcastService.BASE_URL}/${id}`);
  }
}

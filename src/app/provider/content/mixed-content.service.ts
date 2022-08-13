import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpService } from '../helper/http.service';
import { MixedContent } from './mixed-content';

@Injectable({
  providedIn: 'root'
})
export class MixedContentService {
  private static BASE_URL = environment.apiUrl;
  constructor(private readonly http: HttpService) { }

  getLastFeedContent(): Observable<MixedContent[]> {
    return this.http.get(`${MixedContentService.BASE_URL}content/last`);
  }
}




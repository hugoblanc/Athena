import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioContentService {
  private static BASE_URL = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) { }

  getAudioContentUrlById(id: number): Observable<AudioContentUrl | undefined> {
    return this.httpClient.get<AudioContentUrl | undefined>(`${AudioContentService.BASE_URL}content/get-audio-content-url-by-id/${id}`)
  }
}


export interface AudioContentUrl {
  id: number;
  url: string;
}

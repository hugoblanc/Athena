import { Injectable } from '@angular/core';
import { HttpService } from '../helper/http.service';
import { ContentService } from './content.service';
import { MetaMediaService } from '../meta-media/meta-media.service';
import { Video } from '../../models/content/youtube/video';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService extends ContentService<Video> {


  private static YOUTUBE_KEY = 'AIzaSyC8RK2EYC-nyiUielaLeHxHOu_UhztxF6c';

  constructor(private http: HttpService, private metaMediaService: MetaMediaService) {
    super(metaMediaService);
  }

  getContentById(id: number): import('rxjs').Observable<Video> {
    throw new Error('Method not implemented.');
  }
  getContents(url: string): import('rxjs').Observable<Video[]> {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUVeMw72tepFl1Zt5fvf9QKQ&key='
     + YoutubeService.YOUTUBE_KEY);
  }
  loadMore(): import('rxjs').Observable<Video[]> {
    throw new Error('Method not implemented.');
  }

}

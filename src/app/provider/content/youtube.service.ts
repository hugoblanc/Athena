import { Injectable } from '@angular/core';
import { HttpService } from '../helper/http.service';
import { ContentService } from './content.service';
import { MetaMediaService } from '../meta-media/meta-media.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaylistItem } from '../../models/content/youtube/playlist-item';
import { ItemVideo } from '../../models/content/youtube/item-video';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService extends ContentService<ItemVideo> {


  private static YOUTUBE_KEY = 'AIzaSyC8RK2EYC-nyiUielaLeHxHOu_UhztxF6c';

  constructor(private http: HttpService, metaMediaService: MetaMediaService) {
    super(metaMediaService);
  }

  getContentById(id: number): Observable<ItemVideo> {
    throw new Error('Method not implemented.');
  }

  getContents(): Observable<ItemVideo[]> {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUVeMw72tepFl1Zt5fvf9QKQ&key='
      + YoutubeService.YOUTUBE_KEY)
      .pipe(map((data: any) => {
        const playlistItems = new PlaylistItem(data);
        return playlistItems.items;
      }));
  }

  loadMore(): Observable<ItemVideo[]> {
    throw new Error('Method not implemented.');
  }

}

import { Injectable } from '@angular/core';
import { HttpService } from '../helper/http.service';
import { ContentService } from './content.service';
import { MetaMediaService } from '../meta-media/meta-media.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaylistItem } from '../../models/content/youtube/playlist-item';
import { ItemVideo } from '../../models/content/youtube/item-video';
import { ICategories } from '../../models/categories/icategories';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService extends ContentService<ItemVideo> {


  private static YOUTUBE_KEY = 'AIzaSyCKpSKvBresQQ5b8MiH0w2u53iepwP0A5o';

  private static BASE_URL = 'https://www.googleapis.com/youtube/v3/';
  private static VIDEO = 'videos';
  private static VIDEO_ID = 'id=';
  private static PLAYLIST_ITEMS = 'playlistItems';
  private static PLAYLIST_ID = 'playlistId=';

  private static SNIPPET = 'part=snippet';
  private static KEY = 'key=';



  constructor(private http: HttpService, metaMediaService: MetaMediaService) {
    super(metaMediaService);
  }

  getContentById(id: number): Observable<ItemVideo> {
    const video = this.findLocalContentById(id);
    if (video != null) {
      return of(video);
    }
  }


  findServerContentById(id: number): Observable<ItemVideo> {
    const url = this.creatUrl(YoutubeService.VIDEO, YoutubeService.VIDEO_ID + 'UUVeMw72tepFl1Zt5fvf9QKQ');

    return this.http.get(url)
      .pipe(map((data: any) => {
        return new ItemVideo(data.items[0]);
      }));
  }


  getContents(): Observable<ItemVideo[]> {
    const url = this.creatUrl(YoutubeService.PLAYLIST_ITEMS, YoutubeService.PLAYLIST_ID + 'UUVeMw72tepFl1Zt5fvf9QKQ');
    return this.http.get(url)
      .pipe(map((data: any) => {
        const playlistItems = new PlaylistItem(data);
        this.contents = playlistItems.items;
        return this.contents;
      }));
  }

  loadMore(): Observable<ItemVideo[]> {
    throw new Error('Method not implemented.');
  }




  private creatUrl(object: string, idPart: string) {
    const url = YoutubeService.BASE_URL +
      object +
      '?' +
      YoutubeService.SNIPPET +
      '&' +
      idPart +
      YoutubeService.KEY +
      YoutubeService.YOUTUBE_KEY;
    return url;
  }

  getNotificationCategories(): Observable<ICategories[]> {
    throw new Error('Method not implemented.');
  };


}

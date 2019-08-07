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


  private static BASE_URL = 'https://athena-api.caprover.athena-app.fr/';
  private static CONTENT = 'content/';




  constructor(private http: HttpService, metaMediaService: MetaMediaService) {
    super(metaMediaService);
  }

  getContentById(id: number): Observable<ItemVideo> {
    const video = this.findLocalContentById(id);
    if (video != null) {
      return of(video);
    }
  }


  findServerContentById(id: string): Observable<ItemVideo> {
    const url = this.creatUrl(id);
    return this.http.get(url)
      .pipe(map((data: any) => {
        return new ItemVideo(data.items[0]);
      }));
  }


  getContents(): Observable<ItemVideo[]> {
    const url = this.creatUrl();
    return this.http.get(url)
      .pipe(map((data: ItemVideo[]) => {
        this.contents = data;
        return this.contents;
      }));
  }

  loadMore(): Observable<ItemVideo[]> {
    throw new Error('Method not implemented.');
  }




  private creatUrl(idPart?: string) {
    let url = YoutubeService.BASE_URL +
      YoutubeService.CONTENT +
      this.metaMediaService.currentMetaMedia.key;
    if (idPart) {
      url += '/' + idPart;
    }
    return url;
  }

  getNotificationCategories(): Observable<ICategories[]> {
    throw new Error('Method not implemented.');
  }


}

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
  private static MEDIA_KEY = 'mediakey/';




  constructor(private http: HttpService, metaMediaService: MetaMediaService) {
    super(metaMediaService);
  }

  getContentById(id: number): Observable<ItemVideo> {
    const video = this.findLocalContentById(id);
    if (video != null) {
      return of(video);
    }

    return this.findServerContentById(id);
  }


  findServerContentById(id: number): Observable<ItemVideo> {
    const url = this.creatUrl(id);
    return this.http.get(url)
      .pipe(map((data: any) => {
        return new ItemVideo(data);
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




  private creatUrl(idPart?: number) {
    let url = YoutubeService.BASE_URL +
      YoutubeService.CONTENT;
    if (idPart) {
      // Si on cherche par id
      // ex: /content/11
      url += idPart;
    } else {
      // SI on cherche par media key
      // ex: /content/mediakey/osonscauser
      url += YoutubeService.MEDIA_KEY + this.metaMediaService.currentMetaMedia.key;
    }
    return url;
  }

  getNotificationCategories(): Observable<ICategories[]> {
    return of([]);
  }


}

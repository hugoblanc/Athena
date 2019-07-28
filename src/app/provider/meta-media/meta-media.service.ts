import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ListMetaMedias } from '../../models/meta-media/list-meta-medias';
import { MetaMedia } from '../../models/meta-media/meta-media';
import listMetaMediaData from '../../../assets/data/listMetaMediaData.json';
import { HttpService } from '../helper/http.service';

@Injectable({
  providedIn: 'root'
})
export class MetaMediaService {

  public listMetaMedia: ListMetaMedias[] = listMetaMediaData;
  currentMetaMedia: MetaMedia;

  constructor(private http: HttpService) { }

  public getMediaList(): Observable<ListMetaMedias[]> {
    return this.http.get('http://192.168.1.20:3000/media')
      .pipe(tap((data: ListMetaMedias[]) => {
        if (data && data.length > 3) {
          this.listMetaMedia = data;
        }
      }));
  }

  public findAndSetMediaByKey(key: string): MetaMedia {
    for (const lstMetaMedia of this.listMetaMedia) {
      this.currentMetaMedia = lstMetaMedia.metaMedias.find((metaMedia) => metaMedia.key === key);
      return this.currentMetaMedia;
    }
  }



}

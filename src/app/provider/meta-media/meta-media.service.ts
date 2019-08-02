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

  constructor(private http: HttpService) { }
  public static BASE_URL = 'https://athena-api.caprover.athena-app.fr/list-meta-media';

  public listMetaMedia: ListMetaMedias[] = listMetaMediaData;
  currentMetaMedia: MetaMedia;

  public getMetaMediaList(): Observable<ListMetaMedias[]> {
    return this.http.get(MetaMediaService.BASE_URL)
      .pipe(tap((data: ListMetaMedias[]) => {
        if (data && data.length > 0) {
          this.listMetaMedia = data.map((lstMetaMedia) => new ListMetaMedias(lstMetaMedia));
        }
      }));
  }

  public findAndSetMediaByKey(key: string): MetaMedia {
    for (const lstMetaMedia of this.listMetaMedia) {
      this.currentMetaMedia = lstMetaMedia.metaMedias.find((metaMedia) => metaMedia.key === key);
      if (this.currentMetaMedia != null) {
        return this.currentMetaMedia;
      }
    }
  }



}

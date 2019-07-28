import { Injectable } from '@angular/core';
import { IimagedMedia } from '../../models/content/iimaged-content';
import { ItypedContent } from '../../models/content/ityped-content';
import { Observable } from 'rxjs';
import { MetaMedia } from '../../models/meta-media/meta-media';
import { MetaMediaService } from '../meta-media/meta-media.service';

@Injectable({
  providedIn: 'root'
})
export abstract class ContentService<T extends IimagedMedia & ItypedContent> {

  public currentMetaMedia: MetaMedia;

  constructor(private metaMediaService: MetaMediaService) {

  }

  public setAndGetCurrentMediaKey(key: string) {
    this.currentMetaMedia = null;
    this.currentMetaMedia = this.metaMediaService.findMediaByKey(key);
    return this.currentMetaMedia;
  }

  abstract getContentById(id: number): Observable<T>;

  /**
   * Cette methode permet d'initialiser la première récupération de contenu
   * Elle devrait aussi stocker les informations nécessaire pour ensuite effetuer des
   * loarMore sans problème
   */
  abstract  getContents(url: string): Observable<T[]>;

  /**
   * Cette methode permet de charger plus de contenu (dans les infinite scroll notament)
   * Load more ne peut être appelé qu'après getContentByUrl donc si c'est pas le cas ça pete
   */
  abstract loadMore(): Observable<T[]>;
}

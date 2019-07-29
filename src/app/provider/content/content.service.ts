import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetaMedia } from '../../models/meta-media/meta-media';
import { MetaMediaService } from '../meta-media/meta-media.service';
import { IContent } from '../../models/content/icontent';

@Injectable({
  providedIn: 'root'
})
export abstract class ContentService<T extends IContent> {

  contents: T[];

  constructor(protected metaMediaService: MetaMediaService) {

  }

  /**
   * Cette emthode va chercher le contenu d'id: id
   * @param id l'id du contenu a récupérer
   */
  abstract getContentById(id: number | string): Observable<T>;

  /**
   * Cette methode va cherche le contenu en ligne
   * @param id l'id du contenu a aller chercher coté serveur
   */
  abstract findServerContentById(id: number | string): Observable<T>;

  /**
   * Cette methode doit retourner le contenu local au service ou null si non présent
   * @param id l'id du contenu a chercher en local
   */
  protected findLocalContentById(id: number): T {
    if (!this.contents) {
      return null;
    }
    return this.contents.find((content) => (content.id === id));
  }



  /**
   * Cette methode permet d'initialiser la première récupération de contenu
   * Elle devrait aussi stocker les informations nécessaire pour ensuite effetuer des
   * loarMore sans problème
   */
  abstract  getContents(): Observable<T[]>;

  /**
   * Cette methode permet de charger plus de contenu (dans les infinite scroll notament)
   * Load more ne peut être appelé qu'après getContentByUrl donc si c'est pas le cas ça pete
   */
  abstract loadMore(): Observable<T[]>;
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategories } from '../../models/categories/icategories';
import { IContent } from '../../models/content/icontent';
import { Page } from '../../models/core/page';
import { MetaMediaService } from '../meta-media/meta-media.service';

/**
 * Ce service est en réalité un interface pour YoutubeService, WordpressService, ...
 * C'est eux qui seront réellement injecté dans les composant finaux
 * Cepednatn ils suivrons toujours le modèle de ContentService pour utiliser l'héritage
 *
 */
@Injectable({
  providedIn: 'root'
})
export abstract class ContentService<T extends IContent> {

  // Une page est un object qui comporte une liste d'element
  // Ainsi que des metadonées sur ceux-ci
  // Nb total, nombre de page etc ...
  page: Page<T>;

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
    if (!this.page || !this.page.objects) {
      return null;
  }
    return this.page.objects.find((content) => (content.id === id));
  }



  /**
   * Cette methode permet d'initialiser la première récupération de contenu
   * Elle devrait aussi stocker les informations nécessaire pour ensuite effetuer des
   * loarMore sans problème
   */
  abstract getContents(): Observable<Page<T>>;

  /**
   * Cette methode permet de charger plus de contenu (dans les infinite scroll notament)
   * Load more ne peut être appelé qu'après getContentByUrl donc si c'est pas le cas ça pete
   */
  abstract loadMore(): Observable<Page<T>>;


  abstract getNotificationCategories(): Observable<ICategories[]>;
}

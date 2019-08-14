import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from '../../models/content/wordpress/post';
import { Observable, of } from 'rxjs';
import { HttpService } from '../helper/http.service';
import { ContentService } from './content.service';
import { MetaMediaService } from '../meta-media/meta-media.service';
import { WordpressCategory } from '../../models/categories/wordpress-category';
import { Page } from '../../models/core/page';


/**
 * *~~~~~~~~~~~~~~~~~~~
 * Author: HugoBlanc |
 * *~~~~~~~~~~~~~~~~~~~
 * Cette class est le service de medias qui se charge de gérer les données relatives
 * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
@Injectable({
  providedIn: 'root'
})
export class WordpressService extends ContentService<Post> {

  private static WORDPRESS_API = 'wp-json/wp/v2/';
  private static CATEGORIES = 'categories';
  private static POSTS = 'posts';
  private static SIZE_NUMBER = '?per_page=';
  private static PAGE_NUMBER = '&page=';
  private static EMBEDDED_CONTENT = '&_embed';
  private static POST_ONLY = 'posts/';



  constructor(private http: HttpService, metaMediaService: MetaMediaService) {
    super(metaMediaService);
  }

  numberByPage = 8;


  /**
   * Cette methode permet d'intialiser les controlleur abvec
   * le premier chargement
   * Elle reinitialise aussi le numéro de page, appeler uniquement en cas d'init de données
   */
  public getContents(): Observable<Page<Post>> {
    // Ici on reinit le numéro de page a 1 car si on utilise getPostByUrl c'est pour init
    this.page = new Page<Post>();
    this.page.next = 1;
    return this.getDataByUrl()
      .pipe(map((data: Post[]) => {
        this.page.objects = data.map((post) => new Post(post));
        this.page.next = 2;
        return this.page;
      }));
  }

  public loadMore(): Observable<Page<Post>> {
    return this.getDataByUrl()
      .pipe(map((data: Post[]) => {
        try {
          const freshPost = data.map((post) => {
            return new Post(post);
          });
          this.page.objects = [...this.page.objects, ...freshPost];
          this.page.next++;
        } catch (error) {
          throw error;
        }
        return this.page;
      }));
  }


  private getDataByUrl(): Observable<any> {
    const url = this.metaMediaService.currentMetaMedia.url +
      WordpressService.WORDPRESS_API +
      WordpressService.POSTS +
      WordpressService.SIZE_NUMBER + this.numberByPage +
      WordpressService.PAGE_NUMBER + this.page.next +
      WordpressService.EMBEDDED_CONTENT;
    return this.http.get(url, true);
  }

  public getContentById(id: number): Observable<Post> {

    // On cherche d'abord en local
    const post = this.findLocalContentById(id);
    if (post != null) {
      return of(post);
    }

    // Si pas trouvé en local on cherche coté serveur
    return this.findServerContentById(id);

  }

  /**
   * Cette methode permet de renvoyer les categories worpres en virant la moitié toutes les categories
   * dont le nombre d'article est inférieure a al moyenne des article
   * En clair il y a souvent plein de categorie inutilisé donc on ne met pas tout pour simplifier pour l'utilisateur
   */
  public getNotificationCategories(): Observable<WordpressCategory[]> {
    const url = this.metaMediaService.currentMetaMedia.url +
      WordpressService.WORDPRESS_API +
      WordpressService.CATEGORIES + '?per_page=40';
    return this.http.get(url, true).pipe(map((categories: WordpressCategory[]) => {
      let averageCount = 0;
      for (const category of categories) {
        averageCount += category.count;
      }
      averageCount = averageCount / categories.length;
      return categories.filter((category) => {
        return (category.count > averageCount);
      }).sort((a: WordpressCategory, b: WordpressCategory) => {
        return b.count - a.count;
      });
    }));
  }


  findServerContentById(id: number): Observable<Post> {
    const url = this.metaMediaService.currentMetaMedia.url
      + WordpressService.WORDPRESS_API
      + WordpressService.POST_ONLY
      + id
      + '?_embed';

    return this.http.get(url, true)
      .pipe(map((data: Post) => {
        return new Post(data);
      }));
  }

}

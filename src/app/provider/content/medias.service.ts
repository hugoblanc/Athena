import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from '../../models/content/wordpress/post';
import { Observable, of } from 'rxjs';
import { HttpService } from '../helper/http.service';
import { ContentService } from './content.service';
import { MetaMediaService } from '../meta-media/meta-media.service';


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
export class MediasService extends ContentService<Post> {
  private static WORDPRESS_API = 'wp-json/wp/v2/';
  private static POSTS = 'posts';
  private static SIZE_NUMBER = '?per_page=';
  private static PAGE_NUMBER = '&page=';
  private static EMBEDDED_CONTENT = '&_embed';
  private static POST_ONLY = 'posts/';



  constructor(private http: HttpService, metaMediaService: MetaMediaService) {
    super(metaMediaService);
  }


  posts: Post[];
  pageNumber = 1;
  numberByPage = 8;


  /**
   * Cette methode permet d'intialiser les controlleur abvec
   * le premier chargement
   * Elle reinitialise aussi le numéro de page, appeler uniquement en cas d'init de données
   */
  public getContents(): Observable<Post[]> {
    // Ici on reinit le numéro de page a 1 car si on utilise getPostByUrl c'est pour init
    this.pageNumber = 1;
    return this.getDataByUrl()
      .pipe(map((data: Post[]) => {
        this.posts = data.map((post) => new Post(post));
        return this.posts;
      }));
  }

  public loadMore(): Observable<Post[]> {
    this.pageNumber++;
    return this.getDataByUrl()
      .pipe(map((data: Post[]) => {
        try {
          const freshPost = data.map((post) => {
            return new Post(post);
          });
          this.posts = [...this.posts, ...freshPost];
        } catch (error) {
          throw error;
        }
        return this.posts;
      }));
  }


  private getDataByUrl(): Observable<any> {
    const url = this.metaMediaService.currentMetaMedia.url +
      MediasService.WORDPRESS_API +
      MediasService.POSTS +
      MediasService.SIZE_NUMBER + this.numberByPage +
      MediasService.PAGE_NUMBER + this.pageNumber +
      MediasService.EMBEDDED_CONTENT;
    return this.http.get(url);
  }

  public getContentById(id: number): Observable<Post> {

    // On cherche d'abord en local
    const post = this.findLocalPostById(id);
    if (post != null) {
      return of(post);
    }

    // Si pas trouvé en local on cherche coté serveur
    return this.findServerPostById(id);

  }


  private findServerPostById(id: number): Observable<Post> {
    const url = this.metaMediaService.currentMetaMedia.url
      + MediasService.WORDPRESS_API
      + MediasService.POST_ONLY
      + id
      + '?_embed';

    return this.http.get(url)
      .pipe(map((data: Post) => {
        return new Post(data);
      }));
  }

  private findLocalPostById(id: number): Post {
    if (!this.posts) {
      return null;
    }
    return this.posts.find((post) => (post.id === id));
  }




}

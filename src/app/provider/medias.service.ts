import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Post } from '../models/content/wordpress/post';
import { Observable, from } from 'rxjs';
import { MetaMedia } from '../models/meta-media/meta-media';
import { HttpService } from './http.service';
import { ListMetaMedias } from '../models/meta-media/list-meta-medias';
import listMetaMediaData from '../../assets/data/listMetaMediaData.json';


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
export class MediasService {
  private static WORDPRESS_API = 'wp-json/wp/v2/';
  private static POSTS = 'posts';
  private static SIZE_NUMBER = '?per_page=';
  private static PAGE_NUMBER = '&page=';
  private static EMBEDDED_CONTENT = '&_embed';
  private static POST_ONLY = 'posts/';



  constructor(private http: HttpService) { }


  public listMetaMedia: ListMetaMedias[] = listMetaMediaData;

  currentMetaMedia: MetaMedia;
  posts: Post[];
  url: string;
  pageNumber = 1;
  numberByPage = 8;

  public getMediaList(): Observable<ListMetaMedias[]> {
    return this.http.get('http://192.168.1.20:3000/media')
      .pipe(tap((data: ListMetaMedias[]) => {
        if (data && data.length > 3) {
          this.listMetaMedia = data;
        }
      }));
  }

  public setAndGetCurrentMediaKey(key: string) {
    this.currentMetaMedia = null;
    this.currentMetaMedia = this.findMediaByKey(key);
    return this.currentMetaMedia;
  }


  /**
   * Cette methode permet d'intialiser les controlleur abvec
   * le premier chargement
   * Elle reinitialise aussi le numéro de page, appeler uniquement en cas d'init de données
   * @param url  L''url de lressources a récupérer
   */
  public getPostByUrl(url: string): Observable<Post[]> {
    // Ici on reinit le numéro de page a 1 car si on utilise getPostByUrl c'est pour init
    this.pageNumber = 1;
    return this.getDataByUrl(url)
      .pipe(map((data: Post[]) => {
        this.posts = data.map((post) => new Post(post));
        return this.posts;
      }));
  }

  public loadMorePosts(url: string): Observable<Post[]> {
    this.pageNumber++;
    return this.getDataByUrl(url)
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


  private getDataByUrl(url: string): Observable<any> {
    this.url = url;
    return this.http.get(
      this.url +
      MediasService.WORDPRESS_API +
      MediasService.POSTS +
      MediasService.SIZE_NUMBER + this.numberByPage +
      MediasService.PAGE_NUMBER + this.pageNumber +
      MediasService.EMBEDDED_CONTENT);
  }

  getPostByID(metaMedia: MetaMedia, id: number): Observable<Post> {
    return this.http.get(metaMedia.url + MediasService.WORDPRESS_API + MediasService.POST_ONLY + id + '?_embed')
      .pipe(map((data: Post) => {
        return new Post(data);
      }));
  }


  findLocalPostById(id: number): Post {
    if (!this.posts) {
      return null;
    }
    return this.posts.find((post) => (post.id === id));
  }

  findMediaByKey(key: string): MetaMedia {
    for (const lstMetaMedia of this.listMetaMedia) {
      const currentMetaMedia = lstMetaMedia.metaMedias.find((metaMedia) => metaMedia.key === key);
      if (currentMetaMedia != null) {
        return currentMetaMedia;
      }
    }
  }





}

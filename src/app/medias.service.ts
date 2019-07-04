import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Post } from './models/post';
import { Observable } from 'rxjs';
import { MetaMedia } from './models/meta-media';


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



  constructor(public http: HttpClient) { }


  public medias: MetaMedia[] = [
    {
      key: 'lvsl',
      url: 'https://lvsl.fr/',
      title: 'Le Vent Se Lève',
      color: 'tertiary',
      donation: 'https://lvsl.fr/faire-un-don/',
      logo: 'assets/lvsl_logo.png'
    },
    {
      key: 'mrmondialisation',
      url: 'https://mrmondialisation.org/',
      title: 'Mr Mondialisation',
      color: 'secondary',
      donation: 'https://mrmondialisation.org/donation/',
      logo: 'assets/mrmondialisation_logo.png'
    },
    {
      key: 'emesinge',
      url: 'https://www.4emesinge.com/',
      title: 'Le 4eme Singe',
      color: 'success',
      donation: 'https://www.helloasso.com/associations/le-4eme-singe/formulaires/1/fr',
      logo: 'assets/4emesinge_logo.jpg'
    },
  ];


  posts: Post[];
  url: string;
  pageNumber = 1;
  numberByPage = 8;

  public getMediaList(): Observable<MetaMedia[]> {
    return this.http.get('http://192.168.1.20:3000/media')
      .pipe(map((data: MetaMedia[]) => data),
        tap((data) => {
          if (data && data.length > 3) {
            this.medias = data;
          }
        }));
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
        this.posts = [...this.posts, ...data.map((post) => new Post(post))];
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
      MediasService.EMBEDDED_CONTENT
    );
  }

  getPostByID(metaMedia: MetaMedia, id: number): Observable<Post> {
    return this.http
      .get(metaMedia.url + MediasService.WORDPRESS_API + MediasService.POST_ONLY + id + '?_embed').pipe(map((data: Post) => {
        return new Post(data);
      }));
  }


  findLocalPostById(id: number): Post {
    if (!this.posts) {
      return null;
    }
    return this.posts.find((post) => (post.id === id));
  }

  findMediaIdByKey(key: string): number {
    return this.medias.indexOf(this.findMediaByKey(key));
  }

  findMediaByKey(key: string): MetaMedia {
    return this.medias.find((metaMedia) => (metaMedia.key === key));
  }





}

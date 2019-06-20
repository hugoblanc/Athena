import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediasService {


  constructor(public http: HttpClient) { }

  private static WORDPRESS_API = 'wp-json/wp/v2/';

  private static POSTS_EMBEDDED = 'posts?_embed';
  private static POST_ONLY = 'posts/';

  posts: Post[];
  url: string;

  getDataByUrl(url: string): Observable<Post[]> {
    this.url = url;
    return this.http.get(this.url + MediasService.WORDPRESS_API + MediasService.POSTS_EMBEDDED)
      .pipe(map((data: Post[]) => {
        this.posts = data.map((post) => new Post(post));
        return this.posts;
      }));
  }

  getPostByID(id: number): Observable<Post> {
    return this.http
      .get(this.url + MediasService.WORDPRESS_API + MediasService.POST_ONLY).pipe(map((data: Post) => {
        return new Post(data);
      }));
  }


  findLocalPostById(id: number): Post {
    return this.posts.find((post) => (post.id === id));
  }


}

import { Content } from './content';
import { Embedded } from './embedded';

export class Post {
  author: number;
  categories: number[];
  commentStatus: string;
  content: Content;
  date: Date;
  dateGmt: Date;
  excerpt: Content;
  featuredMedia: 25103;
  format: string;
  guid: Content;
  id: number;
  link: string;
  meta: any[];
  modified: Date;
  modifiedGmt: Date;
  pingStatus: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: number[];
  template: string;
  title: Content;
  type: string;
  embedded: Embedded;
  mediaUrl: string;



  constructor(input: any) {
    try {


      Object.assign(this, input);
      this.content = new Content(input.content);
      this.date = new Date(input.date);
      this.commentStatus = input.comment_status;
      this.dateGmt = new Date(input.date_gmt);
      this.excerpt = new Content(input.excerpt);
      this.guid = new Content(input.guid);
      this.featuredMedia = input.featured_media;
      this.modified = new Date(input.modified);
      this.modifiedGmt = new Date(input.modified_gmt);
      this.pingStatus = input.ping_status;
      this.title = new Content(input.title);
      this.embedded = new Embedded(input._embedded);
      if (this.guid &&
        this.guid.rendered &&
        this.embedded &&
        this.embedded.featuredmedia[0] &&
        this.embedded.featuredmedia[0].mediaDetails &&
        this.embedded.featuredmedia[0].mediaDetails.file) {
        const url = this.guid.rendered.split('?');
        this.mediaUrl = url[0] + 'wp-content/uploads/' + this.embedded.featuredmedia[0].mediaDetails.file;
      }

    } catch (error) {
      throw error;
    }
  }
}

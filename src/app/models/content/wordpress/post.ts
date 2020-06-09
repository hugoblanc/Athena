import { MetaMediaType } from '../../meta-media/meta-media-type.enum';
import { IContent } from '../icontent';
import { Iimage } from '../Iimage';
import { Content } from './content';
import { Embedded } from './embedded';

export class Post implements IContent {
  publishedAt: Date;
  contentType: MetaMediaType;
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
  contentId: string | number;
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
  title: string;
  type: string;
  image: Iimage;
  embedded: Embedded;
  videoID?: string;



  constructor(input?: any) {
    try {
      if (input) {


        Object.assign(this, input);
        this.contentId = this.id;
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
        this.title = input.title.rendered;
        this.embedded = new Embedded(input._embedded);
        if (this.guid &&
          this.guid.rendered &&
          this.embedded &&
          this.embedded.featuredmedia &&
          this.embedded.featuredmedia[0] &&
          this.embedded.featuredmedia[0].mediaDetails) {

          this.image = {
            url: this.embedded.featuredmedia[0].sourceUrl,
            height: this.embedded.featuredmedia[0].mediaDetails.height,
            width: this.embedded.featuredmedia[0].mediaDetails.width
          };

          // Fix source url MrMondialisatio il manque le https :/
          const index = this.image.url.indexOf('http');
          if (index === -1 || index > 5) {
            this.image.url = 'https:' + this.image.url;
          }
        }

        this.contentType = MetaMediaType.WORDPRESS;
        this.publishedAt = this.date;

        const startPattern = 'https://www.youtube.com/embed/';
        const endPattern = '?';
        const indexStart = this.content.rendered.indexOf(startPattern);
        if (indexStart !== -1) {
          const endIndex = this.content.rendered.indexOf(endPattern, indexStart);
          this.videoID = this.content.rendered.substring(indexStart + startPattern.length, endIndex);
        }
      }
    } catch (error) {
      throw error;
    }

  }
}

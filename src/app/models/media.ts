import { Content } from './content';

export class Media {
  altText: string;
  author: number;
  caption: Content;
  date: Date;
  id: number;
  link: string;
  mediaDetails: any;
  mediaType: string;
  mimeType: string;
  slug: string;
  smush: any;
  sourceUrl: string;
  title: Content;
  type: string;
  links: any;


  constructor(input: any) {
    Object.assign(this, input);
    this.altText = input.alt_text;
    this.caption = new Content(input.caption);
    this.date = new Date(input.date);
    this.mediaDetails = input.media_details;
    this.mediaType = input.media_type;
    this.mimeType = input.mime_type;
    this.sourceUrl = input.source_url;
    this.title = new Content(input.title);
    this.links = input._links;
  }
}

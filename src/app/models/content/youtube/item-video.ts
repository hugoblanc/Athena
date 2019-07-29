import { Snippet } from './snippet';
import { ContentType } from '../content-type.enum';
import { IContent } from '../icontent';

export class ItemVideo implements IContent {
  publishedAt: Date;
  title: string;
  contentType: ContentType;
  mediaUrl: string;
  mediaHeight: number;
  mediaWidth: number;
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;

  constructor(input: ItemVideo) {
    if (input != null) {
      Object.assign(this, input);
      this.snippet = new Snippet(input.snippet);

      if (this.snippet &&
        this.snippet.thumbnails &&
        this.snippet.thumbnails.medium) {
        this.mediaHeight = this.snippet.thumbnails.medium.height;
        this.mediaWidth = this.snippet.thumbnails.medium.width;
        this.mediaUrl = this.snippet.thumbnails.medium.url;
      }
      this.contentType = ContentType.VIDEO;
      this.title = this.snippet.title;
      this.publishedAt = new Date(this.snippet.publishedAt);
    }
  }
}

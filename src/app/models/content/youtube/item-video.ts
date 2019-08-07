import { Snippet } from './snippet';
import { ContentType } from '../content-type.enum';
import { IContent } from '../icontent';
import { Iimage } from '../Iimage';

export class ItemVideo implements IContent {
  id: number;
  contentId: string;
  title: string;
  publishedAt: Date;
  contentType: ContentType;
  kind: string;
  etag: string;
  image: Iimage;

  constructor(input: ItemVideo) {
    if (input != null) {
      Object.assign(this, input);
    }
  }
}

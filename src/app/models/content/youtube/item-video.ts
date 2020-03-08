import { IContent } from '../icontent';
import { Iimage } from '../Iimage';
import { MetaMediaType } from '../../meta-media/meta-media-type.enum';

export class ItemVideo implements IContent {
  id: number;
  contentId: string;
  title: string;
  description: string;
  publishedAt: Date;
  contentType = MetaMediaType.VIDEO;
  kind: string;
  etag: string;
  image: Iimage;

  constructor(input: ItemVideo) {
    if (input != null) {
      Object.assign(this, input);
      this.publishedAt = new Date(input.publishedAt);
    }
  }
}

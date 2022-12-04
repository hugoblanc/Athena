import { MetaMediaType } from '../../meta-media/meta-media-type.enum';
import { IContent } from '../icontent';
import { Iimage } from '../Iimage';

export class ItemVideo implements IContent {
  id!: number;
  contentId!: string;
  title!: string;
  description!: string;
  publishedAt!: Date;
  contentType = MetaMediaType.VIDEO;
  image!: Iimage;

  constructor(input?: ItemVideo) {
    if (input != null) {
      Object.assign(this, input);
      this.publishedAt = new Date(input.publishedAt);
    }
  }
}

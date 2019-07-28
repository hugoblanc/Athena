import { ContentType } from '../content-type.enum';
import { IContent } from '../icontent';

export class Video implements IContent {

  mediaUrl: string;
  mediaHeight: number;
  mediaWidth: number;
  contentType: ContentType.VIDEO;

}

import { IimagedMedia } from '../iimaged-content';
import { ItypedContent } from '../ityped-content';
import { ContentType } from '../content-type.enum';

export class Video implements IimagedMedia, ItypedContent {

  mediaUrl: string;
  mediaHeight: number;
  mediaWidth: number;
  contentType: ContentType.VIDEO;

}

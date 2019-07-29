import { ItypedContent } from './ityped-content';
import { IimagedMedia } from './iimaged-content';

export interface IContent extends ItypedContent, IimagedMedia {
  title: string;
  publishedAt: Date;
}

import { ItypedContent } from './ityped-content';
import { IimagedMedia } from './iimaged-content';

export interface IContent extends ItypedContent, IimagedMedia {
  id: string | number;
  title: string;
  publishedAt: Date;
}

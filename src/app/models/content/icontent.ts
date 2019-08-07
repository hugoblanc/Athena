import { ItypedContent } from './ityped-content';
import { IimagedMedia } from './iimaged-content';

export interface IContent extends ItypedContent, IimagedMedia {
  id: number;
  contentId: string | number;
  title: string;
  publishedAt: Date;
}

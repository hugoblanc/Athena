import { IimagedMedia } from './iimaged-content';
import { ItypedContent } from './ityped-content';

/**
 * L'interface générale qui caractérise le contenu
 * Il doit être typé, imagé, contenir un titre ainsi qu'une date de publication
 */
export interface IContent extends ItypedContent, IimagedMedia {
  id: number;
  contentId: string | number;
  title: string;
  publishedAt: Date;
}

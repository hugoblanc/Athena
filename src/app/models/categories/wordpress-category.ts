import { ICategories } from './icategories';

export class WordpressCategory implements ICategories {
  public id: number;
  public name: string;
  public slug: string;
  public count: number;
}

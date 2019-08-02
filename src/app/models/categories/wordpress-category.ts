import { ICategories } from './icategories';

export class WordpressCategory implements ICategories {
  public id: number;
  public name: string;
  public slug: string;
  public count: number;

  constructor(input: WordpressCategory) {
    if (input != null) {
      Object.assign(this, input);
    }
  }
}

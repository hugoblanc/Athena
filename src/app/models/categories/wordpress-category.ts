import { ICategories } from './icategories';

/**
 * Implémentation de 'interface categorie pour le flux wordpress
 */
export class WordpressCategory implements ICategories {
  public id!: number;
  public name!: string;
  public slug!: string;
  public count!: number;

  constructor(input?: WordpressCategory) {
    if (input != null) {
      Object.assign(this, input);
    }
  }
}

import { MetaMedia } from './meta-media';

/**
 * Les metaMEdia sont regroupé par type au niveau de l'api
 * Le regroupement par type créait donc des listes de metaMedia
 * on finis donc avec un tableau de liste de meta media (une matrice 2D)
 */
export class ListMetaMedias {
  title!: string;
  metaMedias!: MetaMedia[];

  constructor(input?: ListMetaMedias) {
    if (input != null) {
      this.title = input.title;
      if (input.metaMedias != null && input.metaMedias.length > 0) {
        this.metaMedias = input.metaMedias;
      }
    }
  }

}

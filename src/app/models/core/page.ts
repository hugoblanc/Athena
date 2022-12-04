/**
 * Une page est un element qui regroupe en son sein
 * - une liste d'objet (de type T)
 * - des données sur cette liste
 */
export class Page<T> {
  count!: number;
  totalCount!: number;
  objects!: T[];
  next!: number;
}

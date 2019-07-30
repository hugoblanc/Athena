import { MetaMedia } from './meta-media';

export class ListMetaMedias {
  title: string;
  metaMedias: MetaMedia[];

  constructor(input?: ListMetaMedias) {
    if (input != null) {
      this.title = input.title;
      if (input.metaMedias != null && input.metaMedias.length > 0) {
        // this.metaMedias = input.metaMedias.map((metaMedia) => new MetaMedia(metaMedia));
        // TODO: COntruire des vrai object
        this.metaMedias = input.metaMedias;
      }
    }
  }

}

import { MetaMedia } from './meta-media';
import { MetaMediaType } from './meta-media-type.enum';

export class MetaMediaFactory {
  public static createMetaMedia(input: MetaMedia) {
    if (input != null) {
      switch (input.type) {
        case MetaMediaType.WORDPRESS:

          break;

        default:
          break;
      }
    }
  }
}

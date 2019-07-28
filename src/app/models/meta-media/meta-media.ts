import { MetaMediaType } from './meta-media-type.enum';

export class MetaMedia {
  public key: string;
  public url: string;
  public title: string;
  public type: MetaMediaType | string;
  public donation?: string;
  public notification?: boolean;
  public logo: string;


}

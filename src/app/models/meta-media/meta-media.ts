import { MetaMediaType } from './meta-media-type.enum';
/**
 * Un MetaMedia est l'ensemble des informations que l'on a au sujet d'un media
 * Nom, Url host, lien de dons, logo
 * On enrichis également ces valeur avec les règlage de l'utilisateur sur le sujet
 * notification est renseigné en fonction des réglage locaux du user
 */
export class MetaMedia {
  public key!: string;
  public url!: string;
  public title!: string;
  public type!: MetaMediaType | string;
  public donation?: string;
  public isDonationActivated?: boolean;
  public notification?: boolean;
  public logo!: string;


}

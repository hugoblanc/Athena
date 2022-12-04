import { MetaMediaType } from '../../models/meta-media/meta-media-type.enum';


export class MixedContent {
  id!: number;
  contentId!: string;
  title!: string;
  publishedAt!: string;
  metaMedia!: MetaMedia;
  image?: any;

  get resourceId(): number | string {
    if (this.metaMedia.type === MetaMediaType.WORDPRESS) {
      return this.contentId;
    }
    return this.id;
  }

  constructor(input: Partial<MixedContent>) {
    Object.assign(this, input);
  }
}
interface MetaMedia {
  id: number;
  key: string;
  url: string;
  title: string;
  logo: string;
  donation: string;
  type: string;
}

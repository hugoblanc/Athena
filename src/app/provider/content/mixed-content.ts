

export interface MixedContent {
  id: number;
  contentId: string;
  title: string;
  publishedAt: string;
  metaMedia: MetaMedia;
  image?: any;
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

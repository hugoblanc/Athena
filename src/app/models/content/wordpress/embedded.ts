import { MediaImg } from './media-img';

export class Embedded {

  author!: any[];
  featuredmedia!: MediaImg[];
  term: any[];

  constructor(input: any) {
    Object.assign(this, input);
    this.term = input['wp:term'];
    if (input['wp:featuredmedia']) {
      this.featuredmedia = input['wp:featuredmedia'].map((media: Partial<MediaImg>) => new MediaImg(media));
    }
  }
}

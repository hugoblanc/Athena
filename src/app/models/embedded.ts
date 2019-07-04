import { Media } from './media';

export class Embedded {

  author: any[];
  featuredmedia: Media[];
  term: any[];

  constructor(input: any) {
    Object.assign(this, input);
    this.term = input['wp:term'];
    if (input['wp:featuredmedia']) {
      this.featuredmedia = input['wp:featuredmedia'].map((media) => new Media(media));
    }
  }
}

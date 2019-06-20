import { Media } from './media';

export class Embedded {

  author: any[];
  featuredmedia: Media[];
  term: any[];

  constructor(input: any) {
    Object.assign(this, input);
    this.featuredmedia = input['wp:featuredmedia'];
    this.term = input['wp:term'];
  }
}

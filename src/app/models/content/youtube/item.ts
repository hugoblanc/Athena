import { Snippet } from './snippet';

export class Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;

  constructor(input: Item) {
    if (input != null) {
      Object.assign(this, input);
      this.snippet = new Snippet(input.snippet);
    }
  }
}

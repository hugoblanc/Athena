import { PageInfo } from './page-info';
import { Item } from './item';

export class PlaylistItem {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: PageInfo;
  items: Item[];

  constructor(input: PlaylistItem) {
    if (input != null) {
      Object.assign(this, input);
      this.pageInfo = new PageInfo(input.pageInfo);
      this.items = input.items.map((item) => new Item(item));
    }
  }
}

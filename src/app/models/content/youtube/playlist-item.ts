import { PageInfo } from './page-info'; import { ItemVideo } from './item-video';


export class PlaylistItem {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: PageInfo;
  items: ItemVideo[];

  constructor(input: PlaylistItem) {
    if (input != null) {
      Object.assign(this, input);
      this.pageInfo = new PageInfo(input.pageInfo);
      this.items = input.items.map((item) => new ItemVideo(item));
    }
  }
}

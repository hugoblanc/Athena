import { ResourceId } from './resource-id';
import { Thumbnails } from './thumbnails';

export class Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;

  constructor(input?: Snippet) {
    if (input != null) {
      Object.assign(this, input);
      this.thumbnails = new Thumbnails(input.thumbnails);
      this.resourceId = new ResourceId(input.resourceId);
    }
  }
}

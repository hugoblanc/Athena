export class ResourceId {
  kind: string;
  videoId: string;
  constructor(input?: ResourceId) {
    if (input != null) {
      Object.assign(this, input);
    }
  }
}

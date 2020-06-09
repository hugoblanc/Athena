import { Default } from './default';

export class Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
  standard: Default;
  maxres?: Default;

  constructor(input?: Thumbnails) {
    if (input != null) {
      Object.assign(this, input);
      this.default = new Default(input.default);
      this.medium = new Default(input.medium);
      this.high = new Default(input.high);
      this.standard = new Default(input.standard);
      this.maxres = new Default(input.maxres);
    }
  }
}

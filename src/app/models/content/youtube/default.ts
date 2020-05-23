export class Default {
  url: string;
  width: number;
  height: number;

  constructor(input?: Default) {
    if (input != null) {
      Object.assign(this, input);
    }
  }
}

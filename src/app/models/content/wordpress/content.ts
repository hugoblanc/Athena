export class Content {
  rendered!: string;
  protected?: boolean;

  constructor(input: any) {
    Object.assign(this, input);
  }
}

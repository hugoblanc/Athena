export class Help {
  code!: string;
  title!: string;
  text!: string;

  constructor(help?: Help) {
    if (help) {
      Object.assign(this, help);
    }
  }
}

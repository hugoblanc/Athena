export class PageInfo {
  totalResults: number;
  resultsPerPage: number;

  constructor(input?: PageInfo) {
    if (input != null) {
      Object.assign(this, input);
    }
  }
}

import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";
import { Issue } from "../models/github/github";
import { HttpService } from "./helper/http.service";
import { StorageService } from './helper/storage.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class GithubService {
  public static BASE_ATHENA_URL = environment.apiUrl;
  private static ISSUE = "issues";
  private static CLAP = "/clap";

  /**
   * Source des idées : API Athena (BDD) — migration depuis les GitHub issues.
   * On ne tape plus l'API GitHub en direct ; la liste, le détail et le vote
   * passent tous par l'API Athena (cf. athena_api/src/idea).
   */
  private static FULL_ATHENA_ISSUE_URL =
    GithubService.BASE_ATHENA_URL + GithubService.ISSUE;

  constructor(private readonly http: HttpService, private readonly storage: StorageService) { }

  getIssuesByLabel(label: string): Observable<Issue[]> {

    return forkJoin([
      this.http.get<Issue[]>(GithubService.FULL_ATHENA_ISSUE_URL + `?labels=${label}`),
      this.storage.get<number[]>(StorageService.CLAPPED_ISSUE)
    ]).pipe(
      map(([issues, alreadyClappedIssuesId]) => {
        return issues.map(i => {
          if (alreadyClappedIssuesId && alreadyClappedIssuesId.includes(i.id)) {
            i.hasBeenClapped = true;
          }
          return i;
        });
      })
    );
  }

  getIssueByNumber(issueNumber: number): Observable<Issue> {
    return this.http.get(GithubService.FULL_ATHENA_ISSUE_URL + "/" + issueNumber);
  }

  postIssue(issue: Issue): Observable<Issue> {
    return this.http.post(
      GithubService.BASE_ATHENA_URL + GithubService.ISSUE,
      issue
    );
  }

  postClapComment(issue: Issue): Observable<Issue> {
    const url =
      GithubService.BASE_ATHENA_URL +
      GithubService.ISSUE +
      "/" +
      issue.number +
      GithubService.CLAP;

    return this.http.post(url, {});
  }
}

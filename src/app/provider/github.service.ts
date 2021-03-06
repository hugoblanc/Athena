import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../models/github/github';
import { HttpService } from './helper/http.service';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  public static BASE_ATHENA_URL = 'https://www.athena-app.fr/github/';
  private static BASE_GITHUB_URL = 'https://api.github.com/repos/';
  private static ATHENA = 'hugoblanc/Athena/';
  private static ISSUE = 'issues';
  private static CLAP = '/clap';

  private static FULL_GITHUB_URL = GithubService.BASE_GITHUB_URL + GithubService.ATHENA + GithubService.ISSUE;

  constructor(public http: HttpService) {

  }

  getIssueByLabel(label: string): Observable<Issue[]> {
    return this.http.get(GithubService.FULL_GITHUB_URL + `?labels=${label}`);
  }


  getIssueByNumber(issueNumber: number): Observable<Issue> {
    return this.http.get(GithubService.FULL_GITHUB_URL + '/' + issueNumber);
  }


  postIssue(issue: Issue): Observable<Issue> {
    return this.http.post(GithubService.BASE_ATHENA_URL + GithubService.ISSUE, issue);
  }


  postClapComment(issue: Issue): Observable<Issue> {

    const url = GithubService.BASE_ATHENA_URL
      + GithubService.ISSUE + '/' + issue.number
      + GithubService.CLAP;

    return this.http.post(url, {});
  }
}

import { Injectable } from '@angular/core';
import { HttpService } from './helper/http.service';
import { Observable } from 'rxjs';
import { Issue } from '../models/github/github';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  public static BASE_ATHENA_URL = 'https://athena-api.caprover.athena-app.fr/github/';
  private static BASE_GITHUB_URL = 'https://api.github.com/repos/';
  private static ATHENA = 'hugoblanc/Athena/';
  private static ISSUE = 'issues';



  constructor(public http: HttpService) {

  }

  getIssueByLabel(label: string): Observable<Issue[]> {
    return this.http.get(GithubService.BASE_GITHUB_URL + GithubService.ATHENA + GithubService.ISSUE + `?labels=${label}`);
  }


  postIssue(issue: Issue): Observable<Issue> {
    return this.http.post(GithubService.BASE_ATHENA_URL + GithubService.ISSUE, issue);
  }
}

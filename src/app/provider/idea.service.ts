import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";
import { Issue } from "../models/idea/idea";
import { AnonKeyService } from "./helper/anon-key.service";
import { HttpService } from "./helper/http.service";
import { StorageService } from './helper/storage.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class IdeaService {
  public static BASE_ATHENA_URL = environment.apiUrl;
  private static ISSUE = "issues";
  private static CLAP = "/clap";
  private static DOWNVOTE = "/downvote";

  /**
   * Source des idées : API Athena (BDD) — migration depuis les GitHub issues.
   * On ne tape plus l'API GitHub en direct ; la liste, le détail et le vote
   * passent tous par l'API Athena (cf. athena_api/src/idea).
   */
  private static FULL_ATHENA_ISSUE_URL =
    IdeaService.BASE_ATHENA_URL + IdeaService.ISSUE;

  constructor(
    private readonly http: HttpService,
    private readonly storage: StorageService,
    private readonly anonKey: AnonKeyService,
  ) { }

  getIssuesByLabel(label: string): Observable<Issue[]> {

    return forkJoin([
      this.http.get<Issue[]>(IdeaService.FULL_ATHENA_ISSUE_URL + `?labels=${label}`),
      this.storage.get<number[]>(StorageService.CLAPPED_ISSUE),
      this.storage.get<number[]>(StorageService.DOWNVOTED_ISSUE)
    ]).pipe(
      map(([issues, alreadyClappedIssuesId, alreadyDownvotedIssuesId]) => {
        return issues.map(i => {
          if (alreadyClappedIssuesId && alreadyClappedIssuesId.includes(i.id)) {
            i.hasBeenClapped = true;
          }
          if (alreadyDownvotedIssuesId && alreadyDownvotedIssuesId.includes(i.id)) {
            i.hasBeenDownvoted = true;
          }
          return i;
        });
      })
    );
  }

  getIssueByNumber(issueNumber: number): Observable<Issue> {
    return this.http.get(IdeaService.FULL_ATHENA_ISSUE_URL + "/" + issueNumber);
  }

  postIssue(issue: Issue): Observable<Issue> {
    return this.anonKey.getAnonKey().pipe(
      switchMap((key) =>
        this.http.post<Issue>(
          IdeaService.BASE_ATHENA_URL + IdeaService.ISSUE,
          issue,
          false,
          { "X-Anon-Key": key }
        )
      )
    );
  }

  /**
   * Vote « pour » (clap). Reste anonyme : on envoie la clé anonyme stable de
   * l'appareil en entête `X-Anon-Key` pour la dédup serveur (cf. #252/#273/#101).
   */
  postClapComment(issue: Issue): Observable<Issue> {
    const url = this.clapUrl(issue);
    return this.anonKey.getAnonKey().pipe(
      switchMap((key) => this.http.post<Issue>(url, {}, false, { "X-Anon-Key": key }))
    );
  }

  /**
   * Retire le vote « pour » (toggle). Même clé anonyme que le clap.
   */
  deleteClap(issue: Issue): Observable<Issue> {
    const url = this.clapUrl(issue);
    return this.anonKey.getAnonKey().pipe(
      switchMap((key) => this.http.delete<Issue>(url, false, { "X-Anon-Key": key }))
    );
  }

  /**
   * Vote « contre » (downvote) — AUTH FIREBASE REQUISE. Le Bearer est ajouté
   * automatiquement par l'intercepteur (web) / HttpService (natif).
   */
  postDownvote(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.downvoteUrl(issue), {});
  }

  /**
   * Retire le vote « contre » (toggle). Auth Firebase requise.
   */
  deleteDownvote(issue: Issue): Observable<Issue> {
    return this.http.delete<Issue>(this.downvoteUrl(issue));
  }

  private clapUrl(issue: Issue): string {
    return (
      IdeaService.BASE_ATHENA_URL +
      IdeaService.ISSUE +
      "/" +
      issue.number +
      IdeaService.CLAP
    );
  }

  private downvoteUrl(issue: Issue): string {
    return (
      IdeaService.BASE_ATHENA_URL +
      IdeaService.ISSUE +
      "/" +
      issue.number +
      IdeaService.DOWNVOTE
    );
  }
}

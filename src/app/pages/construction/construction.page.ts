import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { EMPTY, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Issue } from '../../models/idea/idea';
import { FirebaseAuthService } from '../../provider/auth/firebase-auth.service';
import { IdeaService } from '../../provider/idea.service';
import { StorageService } from '../../provider/helper/storage.service';
import { SecondaryMenuService } from '../../provider/secondary-menu.service';
import { IssueModalPage } from './components/issue/issue.modal';

@Component({
  selector: 'ath-construction',
  templateUrl: './construction.page.html',
  styleUrls: ['./construction.page.scss'],
})
export class ConstructionPage implements OnInit {

  issues: Issue[] = [];
  loading = true;
  issueType = 'feature';


  constructor(
    private readonly ideaService: IdeaService,
    private readonly modalController: ModalController,
    private readonly storage: StorageService,
    private readonly secondaryMenu: SecondaryMenuService,
    private readonly authService: FirebaseAuthService,
    private readonly alertController: AlertController,
    private readonly router: Router
  ) { }

  openMoreMenu() {
    this.secondaryMenu.open();
  }

  ngOnInit() {
    this.initIssuesByType(this.issueType);
  }

  issueTypeChanged(ev: any) {
    this.issueType = ev.target.value;
    this.loading = true;
    this.initIssuesByType(this.issueType);
  }


  /**
   * Vote « pour » en toggle. Si l'idée était déjà downvotée, on retire d'abord
   * le vote contre (états mutuellement exclusifs). Le compteur affiché suit la
   * valeur nette renvoyée par le serveur.
   */
  clap(issue: Issue) {
    if (issue.hasBeenClapped) {
      this.ideaService.deleteClap(issue)
        .pipe(
          tap((updated) => this.applyVoteResult(issue, updated, { clapped: false })),
          mergeMap(() => this.storage.removeFromArray(StorageService.CLAPPED_ISSUE, issue.id))
        )
        .subscribe();
      return;
    }

    const removeOpposite$ = issue.hasBeenDownvoted
      ? this.ideaService.deleteDownvote(issue)
      : EMPTY;

    this.runAfter(removeOpposite$, () => {
      if (issue.hasBeenDownvoted) {
        this.storage.removeFromArray(StorageService.DOWNVOTED_ISSUE, issue.id).subscribe();
        issue.hasBeenDownvoted = false;
      }
      this.ideaService.postClapComment(issue)
        .pipe(
          tap((updated) => this.applyVoteResult(issue, updated, { clapped: true })),
          mergeMap(() => this.storage.addToArray(StorageService.CLAPPED_ISSUE, issue.id))
        )
        .subscribe();
    });
  }

  /**
   * Vote « contre » en toggle. Nécessite une connexion (Bearer Firebase). Si
   * l'utilisateur n'est pas connecté, on l'invite à se connecter. Si l'idée
   * était clappée, on retire d'abord le vote pour.
   */
  downvote(issue: Issue) {
    if (!this.authService.isAuthenticated()) {
      this.promptLogin();
      return;
    }

    if (issue.hasBeenDownvoted) {
      this.ideaService.deleteDownvote(issue)
        .pipe(
          tap((updated) => this.applyVoteResult(issue, updated, { downvoted: false })),
          mergeMap(() => this.storage.removeFromArray(StorageService.DOWNVOTED_ISSUE, issue.id))
        )
        .subscribe();
      return;
    }

    const removeOpposite$ = issue.hasBeenClapped
      ? this.ideaService.deleteClap(issue)
      : EMPTY;

    this.runAfter(removeOpposite$, () => {
      if (issue.hasBeenClapped) {
        this.storage.removeFromArray(StorageService.CLAPPED_ISSUE, issue.id).subscribe();
        issue.hasBeenClapped = false;
      }
      this.ideaService.postDownvote(issue)
        .pipe(
          tap((updated) => this.applyVoteResult(issue, updated, { downvoted: true })),
          mergeMap(() => this.storage.addToArray(StorageService.DOWNVOTED_ISSUE, issue.id))
        )
        .subscribe();
    });
  }


  async openCreateModal() {
    const createModal = await this.initModal();
    await createModal.present();

    const valueReturned = await createModal.onDidDismiss();
    const issue = valueReturned.data;

    if (issue != null) {
      this.sendIssue(issue);
    }
  }

  /**
   * Met à jour l'état local de l'idée à partir de la réponse serveur
   * (compteur net) et des nouveaux drapeaux up/down.
   */
  private applyVoteResult(
    issue: Issue,
    updated: Issue,
    flags: { clapped?: boolean; downvoted?: boolean }
  ) {
    if (updated && typeof updated.comments === 'number') {
      issue.comments = updated.comments;
    }
    if (flags.clapped !== undefined) {
      issue.hasBeenClapped = flags.clapped;
    }
    if (flags.downvoted !== undefined) {
      issue.hasBeenDownvoted = flags.downvoted;
    }
  }

  /**
   * Exécute `then` après l'observable `before` (ou immédiatement si EMPTY).
   */
  private runAfter(before: Observable<unknown>, then: () => void) {
    if (before === EMPTY) {
      then();
      return;
    }
    before.subscribe({ next: () => then(), error: () => then() });
  }

  private async promptLogin() {
    const alert = await this.alertController.create({
      header: 'Connexion requise',
      message: 'Connectez-vous pour voter contre une idée.',
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        {
          text: 'Se connecter',
          handler: () => this.router.navigateByUrl('/login'),
        },
      ],
    });
    await alert.present();
  }

  private initIssuesByType(type: string) {
    this.ideaService.getIssuesByLabel(type)
      .subscribe((issues: Issue[]) => {
        this.issues = issues;
        this.loading = false;
      });
  }

  private async initModal() {
    const createModal = await this.modalController.create({
      component: IssueModalPage,
      componentProps: { issueType: this.issueType }
    });
    return createModal;
  }

  private sendIssue(issue: Issue) {
    this.ideaService.postIssue(issue)
      .subscribe((issueCreated: Issue) => {
        this.issues.push(issueCreated);
      });
  }



}

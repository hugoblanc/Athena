import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { IonReorderGroup, ModalController } from '@ionic/angular';
import { IssueModalPage } from '../issue/issue.modal';
import { Issue } from '../models/github/github';
import { ListMetaMedias } from '../models/meta-media/list-meta-medias';
import { GithubService } from '../provider/github.service';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';

/**
 * Cette page est la paremière page qui est chargé dans le cas classique
 * On évitera de mettre trop de logique ici
 * On préfèrera l'approche composant pour décharger la page principale
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public metaMediaService: MetaMediaService,
    private githubService: GithubService,
    private modalController: ModalController,
    private zone: NgZone) {

  }

  listMetaMedia: ListMetaMedias[];
  videos: [];
  width: string;
  issues: Issue[] = [];
  loading = true;


  ngOnInit(): void {
    this.loading = true;
    this.metaMediaService.listMetaMedia$
      .subscribe((listMetaMedia: ListMetaMedias[]) => {
        this.zone.run(() => {
          this.listMetaMedia = listMetaMedia;
          this.loading = false;
        });
      });
    this.githubService.getAllIssue()
      .subscribe((issues: Issue[]) => {
        this.issues = issues;
        this.loading = false;
      });
  }

  async createIssue() {
    const modal = await this.modalController.create({
      component: IssueModalPage
    });
    modal.onDidDismiss().then((data?: any) => {
      if (data != null) {
        this.issues.push(data.data);
      }
      console.log(data);

    });
    return await modal.present();
  }

}

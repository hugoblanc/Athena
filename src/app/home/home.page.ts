import { Component, OnInit, ViewChild } from '@angular/core';
import { IonReorderGroup, ModalController } from '@ionic/angular';
import { IssueModalPage } from '../issue/issue.modal';
import { Issue } from '../models/github/github';
import { ListMetaMedias } from '../models/meta-media/list-meta-medias';
import { GithubService } from '../provider/github.service';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public metaMediaService: MetaMediaService,
              private githubService: GithubService,
              private modalController: ModalController) { }

  listMetaMedia: ListMetaMedias[];
  videos: [];
  width: string;
  issues: Issue[];

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;


  ngOnInit(): void {
    this.metaMediaService.listMetaMedia$
      .subscribe((listMetaMedia: ListMetaMedias[]) => {
        this.listMetaMedia = listMetaMedia;
      });
  }

  ngOnInit(): void {
    this.githubService.getAllIssue()
      .subscribe((issues: Issue[]) => {
        this.issues = issues;
      });
  }


  async createIssue() {
    const modal = await this.modalController.create({
      component: IssueModalPage
    });
    modal.onDidDismiss().then((data) => {
      if (data != null) {

      }
      console.log(data);

    });
    return await modal.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { IssueModalPage } from '../../issue/issue.modal';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ath-tuto',
  templateUrl: './tuto.page.html',
  styleUrls: ['./tuto.page.scss'],
})
export class TutoPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
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

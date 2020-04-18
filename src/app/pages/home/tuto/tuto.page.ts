import { Component, OnInit } from '@angular/core';
import { IssueModalPage } from '../../construction/issue/issue.modal';
import { ModalController } from '@ionic/angular';

/**
 * Cette page est un ensemble de trois slides qui permet d'afficher les infrmations essentielle
 * ces information ne sont affichez qu'une seul fois au démarrage de l'application
 *
 */
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

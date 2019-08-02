import { Component, OnInit, ViewChild } from '@angular/core';
import { ListMetaMedias } from '../models/meta-media/list-meta-medias';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';
import { IonReorderGroup, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public metaMediaService: MetaMediaService, public toastController: ToastController) { }

  listMetaMedia: ListMetaMedias[];
  videos: [];
  items = [
    'Créer un vote par classement des nouvelles fonctionnalités',
    'Intégrer les vidéos youtubes'];

  showBtn = false;

  width: string;

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;


  ngOnInit(): void {
    this.listMetaMedia = this.metaMediaService.listMetaMedia;
  }



  doReorder(ev: any) {
    // Before complete is called with the items they will remain in the
    // order before the drag
    console.log('Before complete', this.items);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    ev.detail.complete(true);


    // After complete is called the items will be in the new order
    console.log('After complete', this.items);
    this.showBtn = true;
  }



  async showConfirmation() {
    const toast = await this.toastController.create({
      header: 'Confirmation',
      message: 'Ton classement a bien été enregistré ',
      position: 'bottom',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}

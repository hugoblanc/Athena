import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { ICategories } from '../../../models/categories/icategories';
import { IContent } from '../../../models/content/icontent';
import { MetaMedia } from '../../../models/meta-media/meta-media';
import { ContentService } from '../../../provider/content/content.service';
import { contentServiceProvider } from '../../../provider/content/content.service.provider';
import { NotificationService } from '../../../provider/notification.service';

/**
 * Ce composant permet d'afficher le header d'un meta media
 * On y retrouve un boutton qui affiche les régalge des notifications
 * Ce boutton créait une alerte qui dépend des categories dispo pour le
 * media en question
 */
@Component({
  selector: 'ath-media-notif-toggle',
  templateUrl: './media-notif-toggle.component.html',
  styleUrls: ['./media-notif-toggle.component.scss'],
  providers: [contentServiceProvider]
})
export class MediaNotifToggleComponent implements OnInit {

  @Input() media: MetaMedia;

  categories: ICategories[];
  constructor(
    private notificationService: NotificationService,
    public contentService: ContentService<IContent>,
    private alertController: AlertController) { }

  ngOnInit() {
    // Récupération des categories pour le metamedia actuel
    this.contentService.getNotificationCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  /**
   * Création de l'alert qui demande à l'utilisateur ce qu'il veut activer/désactiver
   */
  async createAlertNotif() {
    if (this.categories == null || this.categories.length === 0) {
      return;
    }
    // Création d'un tableau de category
    const inputs: AlertInput[] = this.categories.map((category) => {
      return {
        name: category.slug,
        type: 'checkbox',
        label: category.name,
        value: category.id,
        checked: this.notificationService.isCategoryActivated(this.media.key, category.id),
      } as AlertInput;
    });

    // Ajout de la category all au debut de le la liste
    inputs.unshift({
      name: 'all',
      type: 'checkbox',
      label: 'Toutes les notifs',
      value: 'all',
      checked: this.media.notification
    });

    // Création de l'alert
    const alert = await this.alertController.create({
      header: 'Notifications',
      subHeader: 'Recevoir: ',
      inputs,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            // On laisse le notification servcie gérer les données choisit par l'utilisateur
            this.notificationService.dealWithUserChoice(this.media, data, [...this.categories]).subscribe((data) => {
              console.log('Data saved');
              console.log(data);
            });
          }
        }
      ]
    });

    await alert.present();
  }


}

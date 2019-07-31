import { Component, OnInit, Input } from '@angular/core';
import { MetaMedia } from '../../models/meta-media/meta-media';
import { NotificationService } from '../../provider/notification.service';
import { contentServiceProvider } from '../../provider/content/content.service.provider';
import { ContentService } from '../../provider/content/content.service';
import { IContent } from '../../models/content/icontent';
import { AlertController } from '@ionic/angular';
import { ICategories } from '../../models/categories/icategories';
import { AlertInput } from '@ionic/core';

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
    this.contentService.getNotificationCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  /**
   * Cette methode se charge de set un nouvel état pour les notification du media courant
   */
  setNotifSetting() {
    // On envoi l'état opposé à l'état actuel
    this.notificationService.switchNotifSetting(this.media.key, !this.media.notification)
      .subscribe((result) => {
        // On s'en balec
      });
  }

  async createAlertNotif() {
    if (this.categories == null || this.categories.length === 0) {
      return;
    }
    const inputs: AlertInput[] = this.categories.map((category) => {
      return {
        name: category.slug,
        type: 'checkbox',
        label: category.name,
        value: category.id,
        check: true
      };
    });


    const alert = await this.alertController.create({
      header: 'Notifications',
      subHeader: 'Recevoir: ',
      inputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }


}

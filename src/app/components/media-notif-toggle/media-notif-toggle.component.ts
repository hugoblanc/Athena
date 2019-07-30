import { Component, OnInit, Input } from '@angular/core';
import { MetaMedia } from '../../models/meta-media/meta-media';
import { NotificationService } from '../../provider/notification.service';

@Component({
  selector: 'ath-media-notif-toggle',
  templateUrl: './media-notif-toggle.component.html',
  styleUrls: ['./media-notif-toggle.component.scss'],
})
export class MediaNotifToggleComponent implements OnInit {

  @Input() media: MetaMedia;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() { }

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


}

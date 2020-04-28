import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertButton, AlertInput } from '@ionic/core';
import { from } from 'rxjs';

/**
 * Ce service doit servir de wrapper pour l'affichage des alert'
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private static BASIC_BUTTONS: AlertButton[] = [{ text: 'Annuler', role: 'cancel' }, { text: 'Ok' }];

  constructor(private alertController: AlertController) {

  }


  openExternalLink(header: string, message: string, url: string) {
    const basic = AlertService.BASIC_BUTTONS;

    // On rajoute le handler sur le boutton ok
    basic[1].handler = () => {
      window.open(url, '_system');
    };
    return from(this.classicAlert(header, undefined, message, undefined, basic));
  }



  async classicAlert(header: string,
                     subHeader: string,
                     message: string,
                     inputs: AlertInput[],
                     buttons: AlertButton[] = AlertService.BASIC_BUTTONS
  ) {

    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      inputs,
      buttons,
      cssClass: 'ath-alert'
    });

    await alert.present();
  }
}

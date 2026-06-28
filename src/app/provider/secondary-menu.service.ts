import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

/**
 * Menu secondaire « moins visible » : regroupe les pages qui ne sont plus dans
 * la tab bar (Propositions de loi, Infos) derrière un bouton « ··· » présent en
 * tête des pages principales. Ouvre un action sheet natif.
 */
@Injectable({ providedIn: 'root' })
export class SecondaryMenuService {
  constructor(
    private readonly actionSheetController: ActionSheetController,
    private readonly router: Router
  ) {}

  async open(): Promise<void> {
    const sheet = await this.actionSheetController.create({
      cssClass: 'secondary-menu-sheet',
      buttons: [
        {
          text: 'Propositions de loi',
          icon: 'document-text-outline',
          handler: () => {
            this.router.navigateByUrl('/tabs/propositions');
          },
        },
        {
          text: 'Infos & à propos',
          icon: 'information-circle-outline',
          handler: () => {
            this.router.navigateByUrl('/tabs/informations');
          },
        },
        {
          text: 'Annuler',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await sheet.present();
  }
}

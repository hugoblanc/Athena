import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

import { ListMetaMedias } from './models/meta-media/list-meta-medias';
import { StorageService } from './provider/helper/storage.service';
import { MetaMediaService } from './provider/meta-media/meta-media.service';
import { NotificationService } from './provider/notification.service';

/**
 * *~~~~~~~~~~~~~~~~~~~
 * Author: HugoBlanc |
 * *~~~~~~~~~~~~~~~~~~~
 * Cette class est le point de départ de notre application
 * Elle représente donc la première page sur laquel on arrive
 * Elle gères donc certaines fonctionalité native du téléphone
 * Mais aussi la liste des média afficher dans le menu
 * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  private static DISPLAY_TUTO = 'DISPLAY_TUTO';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private metaMediaService: MetaMediaService,
    private notificationService: NotificationService,
    private storage: StorageService,
    private router: Router,
    private iab: InAppBrowser
  ) { }

  // La liste des différent médias que l'on veut afficher dans le menu
  appPages: ListMetaMedias[];

  /**
   * La methode qui est automatiquement appelé au démarrage du composant
   */
  ngOnInit(): void {
    // On déclanche l'initialisation de l'application
    this.initializeApp();
  }



  initializeApp() {
    // Ici on récupère les media stocké en local dans le media service
    this.appPages = this.metaMediaService.listMetaMedia;

    // Ici on gères les accès au fonciontnalité native du téléphone
    this.platform.ready().then(() => {
      // La couleur de la bar de status
      setTimeout(() => {
        this.statusBar.overlaysWebView(true);
      }, 500);

      this.metaMediaService.listMetaMedia$
        .subscribe((listMetaMedia: ListMetaMedias[]) => {
          this.appPages = listMetaMedia;
          this.notificationService.initData()
            .subscribe((datas) => {
              console.log(datas);
            });
        });


      // La fin de l'affichage du splash screen
      this.splashScreen.hide();

      this.notificationService.initOpenNotification();
      this.notificationService.initData()
        .subscribe((datas) => {
          console.log(datas);
        });


      this.storage.get(AppComponent.DISPLAY_TUTO).subscribe((alreadyDisplayed) => {
        if (alreadyDisplayed) {
          return;
        }
        this.router.navigate(['/tuto']);
        this.storage.set(AppComponent.DISPLAY_TUTO, true);
      });
    });
  }

  openPrivacy() {
    const browser = this.iab.create('https://athena-api.caprover.athena-app.fr/privacy', '_blank');
  }
}

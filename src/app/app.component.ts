import { Component, OnInit, NgZone } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NotificationService } from './provider/notification.service';
import { ListMetaMedias } from './models/meta-media/list-meta-medias';
import { MetaMediaService } from './provider/meta-media/meta-media.service';


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


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private metaMediaService: MetaMediaService,
    private notificationService: NotificationService,
    private zone: NgZone
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

    });





  }
}

import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MediasService } from './medias.service';
import { MetaMedia } from './models/meta-media';
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


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private mediasService: MediasService,
    private notificationService: NotificationService
  ) { }

  // La liste des différent médias que l'on veut afficher dans le menu
  appPages: MetaMedia[];

  ionDid;

  /**
   * La methode qui est automatiquement appelé au démarrage du composant
   */
  ngOnInit(): void {
    // On déclanche l'initialisation de l'application
    this.initializeApp();
  }



  initializeApp() {

    // Ici on gères les accès au fonciontnalité native du téléphone
    this.platform.ready().then(() => {
      // La couleur de la bar de status
      setTimeout(() => {
        this.statusBar.overlaysWebView(true);
      }, 500);

      // La fin de l'affichage du splash screen
      this.splashScreen.hide();

      this.notificationService.initOpenNotification();
      this.notificationService.initData()
        .subscribe((datas) => {
          console.log(datas);
        });

    });

    // Ici on récupère les media stocké en local dans le media service
    this.appPages = this.mediasService.medias;

    // Et on vérifie aussi qu'il n'y a pas des nouveau media sur le serveur
    // TODO: Décommenter ce truc quand ready
    // this.mediasService.getMediaList()
    //   .subscribe((metaMedias) => {
    //     // S'il y avait des nouveau média il sont maintenant stocké dans les ".medias;" locaux du service
    //     // Voir getMedia pour plus d'informations
    //     this.appPages = this.mediasService.medias;
    //   });



  }
}

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {



  appPages = [
    {
      title: 'Le vent se lève',
      url: '/media/0',
      host: 'https://lvsl.fr/',
      icon: 'calendar'
    },
    {
      title: 'Mr Mondialisation',
      url: '/media/1',
      host: 'https://mrmondialisation.org/',
      icon: 'contacts'
    },
    {
      title: 'Le 4 ème singe',
      url: '/media/2',
      host: 'https://www.4emesinge.com/',
      icon: 'contacts'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

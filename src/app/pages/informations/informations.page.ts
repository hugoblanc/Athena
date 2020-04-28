import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LinkService } from '../../provider/helper/link.service';

/**
 * Cette page permet d'afficher quelque informations supplémentaire sur l'application
 * - lien github
 * - esprit du projet
 */
@Component({
  selector: 'bf-informations',
  templateUrl: './informations.page.html',
  styleUrls: ['./informations.page.scss'],
})
export class InformationsPage implements OnInit {

  constructor(public statusBar: StatusBar, private linkService: LinkService) { }

  ngOnInit() {

  }

  openLink(link: string) {
    this.linkService.launchInAppBrowser(link);
  }
}

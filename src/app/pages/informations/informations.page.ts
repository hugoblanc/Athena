import { Component, OnInit } from '@angular/core';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';

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
export class InformationsPage {
  curr_playing_file!: MediaObject;
  constructor(private linkService: LinkService) { }


  openLink(link: string) {
    this.linkService.launchInAppBrowser(link);
  }
}

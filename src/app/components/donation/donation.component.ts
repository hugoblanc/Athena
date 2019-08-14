import { Component, OnInit } from '@angular/core';
import { MetaMediaService } from '../../provider/meta-media/meta-media.service';
import { AlertService } from '../../provider/helper/alert.service';

/**
 * Ce composant est la pour gérer l'affichage ou non de l'element qui mène vers les pages de dons
 */
@Component({
  selector: 'ath-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],
})
export class DonationComponent implements OnInit {



  constructor(public metaMediaService: MetaMediaService,
              private alertService: AlertService) { }

  ngOnInit() {

  }


  askConfirmation() {
    this.alertService.openExternalLink(
      'Soutenir ' + this.metaMediaService.currentMetaMedia.title,
      'Vous allez être redirigé vers la page de soutient mise en place par '
      + this.metaMediaService.currentMetaMedia.title, this.metaMediaService.currentMetaMedia.donation);
  }

}

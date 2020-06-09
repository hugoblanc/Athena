import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ListMetaMedias } from '../../models/meta-media/list-meta-medias';

/**
 * Ce composant représente un bloc horizontal (titre + metaMedia)
 *
 * Il permet donc de regrouper par type de metamedia tout en affichant
 * d'une manière agréable
 */
@Component({
  selector: 'ath-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
})
export class HorizontalComponent implements OnInit {

  @Input() listMetaMedia: ListMetaMedias;

  isIOS = false;
  constructor(private platform: Platform) { }


  ngOnInit() {
    this.isIOS = true || this.platform.is('ios');
  }


}

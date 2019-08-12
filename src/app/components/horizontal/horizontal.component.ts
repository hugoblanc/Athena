import { Component, OnInit, Input } from '@angular/core';
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


  constructor() { }


  ngOnInit() {

  }


}

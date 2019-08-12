import { Component, OnInit, Input } from '@angular/core';

/**
 * Ce composant représent le loader de chargement des pages
 * il s'intègre à la plage plutot que de faire apparaitre une popup par dessus
 * l'indicateur loading permet d'afficher ou non le composant
 */
@Component({
  selector: 'ath-loader',
  templateUrl: './ath-loader.component.html',
  styleUrls: ['./ath-loader.component.scss'],
})
export class AthLoaderComponent implements OnInit {

  // Indicateur d'affichage
  @Input() loading: boolean;

  constructor() { }

  ngOnInit() {
  }

}

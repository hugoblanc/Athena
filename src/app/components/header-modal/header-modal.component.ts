import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


/**
 * Header de modal:
 * Les modal doivent permettre la navigation arrière via clique sur croix
 * cette croix est placé en haut a droite
 * Il faut aussi afficher un titre
 */
@Component({
  selector: 'ath-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss'],
})
export class HeaderModalComponent implements OnInit {

  // Le titre de al modale
  @Input() title!: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  /**
   * La methode qui permet de masquer la modal en cas de clique sur le croix
   */
  dismiss() {
    this.modalController.dismiss();
  }
}

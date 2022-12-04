import { Component, Input, OnInit } from '@angular/core';
import { Iimage } from '../../models/content/Iimage';


/**
 * Ce composant permet d'afficher des images en respectant leurs taille
 * Ceci permet d'eviter les bugs au chargement
 * En effet le chargement pose pb car le navigateur doit définir les tailles des composants
 * le plus vite possible, par défaut il fait donc:
 * - Taille immage inconnue, donc set dimmension = 0
 * - Téléchargement de l'image, récupération des dimensions réelle
 * - Set des dimensions réelles de l'image
 * - bug de décallage du contenu
 *
 * A la place de ça on fait un calcul savant pour prédéfinir la taille des iamge qu'on a récupéré avec elle
 * Voir la template img.component.html  pour comprendre
 */
@Component({
  selector: 'ath-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent {

  @Input() img!: Iimage;

  @Input() icon?: string;

  ratio = screen.width * 0.43;


}

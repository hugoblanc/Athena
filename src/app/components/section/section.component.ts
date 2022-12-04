import { Component, Input, OnInit } from '@angular/core';

/**
 * Composant permetant l"affichage d'un titre propre en mode material
 */
@Component({
  selector: 'ath-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {

  @Input() title!: string;


}

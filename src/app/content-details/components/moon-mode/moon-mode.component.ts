import { Component, OnInit } from '@angular/core';
import { StyleService } from '../../../provider/style.service';

@Component({
  selector: 'ath-moon-mode',
  templateUrl: './moon-mode.component.html',
  styleUrls: ['./moon-mode.component.scss'],
})
export class MoonModeComponent implements OnInit {

  constructor(public styleService: StyleService) { }

  ngOnInit() { }

  /**
   * Cette methode permet de basculer en mode nuit
   */
  switchNightMode() {
    this.styleService.switchNightMode();
  }

}

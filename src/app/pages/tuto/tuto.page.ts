import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { StorageService } from '../../provider/helper/storage.service';

/**
 * Cette page est un ensemble de trois slides qui permet d'afficher les infrmations essentielle
 * ces information ne sont affichez qu'une seul fois au démarrage de l'application
 *
 */
@Component({
  selector: 'ath-tuto',
  templateUrl: './tuto.page.html',
  styleUrls: ['./tuto.page.scss'],
})
export class TutoPage implements OnInit {

  constructor(private storageService: StorageService, private router: Router) { }


  @ViewChild(IonSlides, {static: true}) slides: IonSlides;

  ngOnInit() {
  }
  async next() {
    const index = await this.slides.getActiveIndex();
    if (index < 2) {
      await this.slides.slideNext();
    } else {
      this.finishTuto();
    }
  }


  finishTuto() {
    this.storageService.initFirstLaunch();
    this.router.navigateByUrl('/tabs/home');
  }
}

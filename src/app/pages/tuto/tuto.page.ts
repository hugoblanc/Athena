import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../provider/helper/storage.service';
import { Router } from '@angular/router';

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

  ngOnInit() {
  }


  finishTuto() {
    this.storageService.initFirstLaunch();
    this.router.navigateByUrl('/tabs/home');
  }
}

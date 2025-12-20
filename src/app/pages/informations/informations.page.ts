import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Observable } from 'rxjs';
import { User } from '@capacitor-firebase/authentication';

import { LinkService } from '../../provider/helper/link.service';
import { FirebaseAuthService } from '../../provider/auth/firebase-auth.service';

/**
 * Cette page permet d'afficher quelque informations supplémentaire sur l'application
 * - lien github
 * - esprit du projet
 */
@Component({
  selector: 'bf-informations',
  templateUrl: './informations.page.html',
  styleUrls: ['./informations.page.scss'],
})
export class InformationsPage {
  curr_playing_file!: MediaObject;
  user$: Observable<User | null>;

  constructor(
    private linkService: LinkService,
    private authService: FirebaseAuthService,
    private router: Router
  ) {
    this.user$ = this.authService.getCurrentUser();
  }

  openLink(link: string) {
    this.linkService.launchInAppBrowser(link);
  }

  navigateToAuth() {
    this.router.navigateByUrl('/login');
  }

  navigateToProfile() {
    this.router.navigateByUrl('/profile');
  }
}

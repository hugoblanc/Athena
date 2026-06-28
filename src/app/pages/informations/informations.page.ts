import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@capacitor-firebase/authentication';

import { LinkService } from '../../provider/helper/link.service';
import { FirebaseAuthService } from '../../provider/auth/firebase-auth.service';
import { NotificationService } from '../../provider/notification.service';

/**
 * Cette page permet d'afficher quelque informations supplémentaire sur l'application
 * - lien github
 * - esprit du projet
 * - interrupteur global des notifications (#90)
 */
@Component({
  selector: 'bf-informations',
  templateUrl: './informations.page.html',
  styleUrls: ['./informations.page.scss'],
})
export class InformationsPage implements OnInit {
  user$: Observable<User | null>;

  /** État du master switch des notifications (true = activées). */
  notificationsEnabled = true;
  /** Évite de redéclencher un (dés)abonnement lors de l'init du toggle. */
  private notificationsToggleReady = false;

  constructor(
    private linkService: LinkService,
    private authService: FirebaseAuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.user$ = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.notificationService.isNotificationsMasterEnabled().subscribe((enabled) => {
      this.notificationsEnabled = enabled;
      this.notificationsToggleReady = true;
    });
  }

  /**
   * Coupe ou réactive toutes les notifications d'un coup. Ignore l'événement
   * émis lors de l'initialisation du toggle (pas d'appel réseau inutile).
   */
  onNotificationsToggle(event: CustomEvent) {
    const enabled = !!(event.detail as { checked?: boolean }).checked;
    if (!this.notificationsToggleReady || enabled === this.notificationsEnabled) {
      return;
    }
    this.notificationsEnabled = enabled;
    this.notificationService.setAllNotifications(enabled).subscribe();
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

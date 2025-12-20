import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirebaseAuthService } from '../../provider/auth/firebase-auth.service';
import { Observable } from 'rxjs';
import { User as FirebaseUser } from '@capacitor-firebase/authentication';
import { environment } from '../../../environments/environment';

interface UserProfile {
  id: number;
  email: string;
  displayName: string;
  photoUrl: string;
  provider: string;
  createdAt: string;
  lastLoginAt: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user$: Observable<FirebaseUser | null>;
  profile: UserProfile | null = null;
  loading = true;

  constructor(
    private authService: FirebaseAuthService,
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {
    this.user$ = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.http.get<UserProfile>(`${environment.apiUrl}auth/me`).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.loading = false;
      },
    });
  }

  async signOut() {
    const alert = await this.alertController.create({
      header: 'Déconnexion',
      message: 'Êtes-vous sûr de vouloir vous déconnecter?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Déconnexion',
          role: 'confirm',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Déconnexion...',
            });
            await loading.present();

            this.authService.signOut().subscribe({
              next: () => {
                loading.dismiss();
                this.router.navigateByUrl('/tabs/feed');
              },
              error: (error) => {
                loading.dismiss();
                console.error('Sign out error:', error);
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  getProviderName(provider: string): string {
    switch (provider) {
      case 'google.com':
        return 'Google';
      case 'password':
        return 'Email/Mot de passe';
      default:
        return provider;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirebaseAuthService } from '../../provider/auth/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private authService: FirebaseAuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  async signInWithGoogle() {
    const loading = await this.loadingController.create({
      message: 'Connexion en cours...',
    });
    await loading.present();

    this.authService.signInWithGoogle().subscribe({
      next: () => {
        loading.dismiss();
        this.router.navigateByUrl('/tabs/feed');
      },
      error: async (error) => {
        loading.dismiss();
        await this.showError('Erreur de connexion Google', error.message);
      },
    });
  }

  async signInWithEmail() {
    if (!this.email || !this.password) {
      await this.showError('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Connexion en cours...',
    });
    await loading.present();

    this.authService.signInWithEmail(this.email, this.password).subscribe({
      next: () => {
        loading.dismiss();
        this.router.navigateByUrl('/tabs/feed');
      },
      error: async (error) => {
        loading.dismiss();
        let message = 'Une erreur est survenue';
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          message = 'Email ou mot de passe incorrect';
        } else if (error.code === 'auth/invalid-email') {
          message = 'Email invalide';
        }
        await this.showError('Erreur de connexion', message);
      },
    });
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  async forgotPassword() {
    if (!this.email) {
      await this.showError('Email requis', 'Veuillez entrer votre email pour réinitialiser votre mot de passe');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Envoi en cours...',
    });
    await loading.present();

    this.authService.sendPasswordResetEmail(this.email).subscribe({
      next: async () => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Email envoyé',
          message: 'Un email de réinitialisation a été envoyé à ' + this.email,
          buttons: ['OK'],
        });
        await alert.present();
      },
      error: async (error) => {
        loading.dismiss();
        await this.showError('Erreur', error.message);
      },
    });
  }

  private async showError(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

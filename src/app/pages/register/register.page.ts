import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirebaseAuthService } from '../../provider/auth/firebase-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private authService: FirebaseAuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  async registerWithEmail() {
    if (!this.email || !this.password || !this.confirmPassword) {
      await this.showError('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await this.showError('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (this.password.length < 6) {
      await this.showError('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Création du compte...',
    });
    await loading.present();

    this.authService.registerWithEmail(this.email, this.password).subscribe({
      next: () => {
        loading.dismiss();
        this.router.navigateByUrl('/tabs/feed');
      },
      error: async (error) => {
        loading.dismiss();
        let message = 'Une erreur est survenue';
        if (error.code === 'auth/email-already-in-use') {
          message = 'Cet email est déjà utilisé';
        } else if (error.code === 'auth/invalid-email') {
          message = 'Email invalide';
        } else if (error.code === 'auth/weak-password') {
          message = 'Le mot de passe est trop faible';
        }
        await this.showError('Erreur de création de compte', message);
      },
    });
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
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

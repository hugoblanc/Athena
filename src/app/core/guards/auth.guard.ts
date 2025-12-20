import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseAuthService } from '../../provider/auth/firebase-auth.service';

/**
 * Guard pour protéger les routes qui nécessitent une authentification
 * Redirige vers /login si l'utilisateur n'est pas authentifié
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: FirebaseAuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getCurrentUser().pipe(
      map((user) => {
        if (user) {
          return true; // Utilisateur connecté, autoriser l'accès
        } else {
          // Rediriger vers la page de login
          return this.router.createUrlTree(['/login']);
        }
      }),
    );
  }
}

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { FirebaseAuthService } from '../../provider/auth/firebase-auth.service';

/**
 * Intercepteur HTTP qui attache automatiquement le token Firebase
 * à toutes les requêtes sortantes et gère le refresh du token en cas d'erreur 401
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: FirebaseAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérer le token actuel
    return this.authService.getIdToken().pipe(
      take(1),
      switchMap((token) => {
        // Cloner la requête et ajouter le header Authorization si le token existe
        const authReq = token
          ? req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            })
          : req;

        // Envoyer la requête
        return next.handle(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            // Si erreur 401 (Unauthorized), tenter de rafraîchir le token
            if (error.status === 401 && token) {
              console.log('Token expired, refreshing...');
              return from(this.authService.getFreshIdToken()).pipe(
                switchMap((newToken) => {
                  if (newToken) {
                    // Retry la requête avec le nouveau token
                    const retryReq = req.clone({
                      setHeaders: {
                        Authorization: `Bearer ${newToken}`,
                      },
                    });
                    return next.handle(retryReq);
                  } else {
                    // Impossible de rafraîchir le token, déconnecter l'utilisateur
                    console.error('Could not refresh token, signing out');
                    this.authService.signOut().subscribe();
                    return throwError(() => error);
                  }
                }),
              );
            }
            return throwError(() => error);
          }),
        );
      }),
    );
  }
}

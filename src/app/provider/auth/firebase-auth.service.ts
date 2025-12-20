import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  FirebaseAuthentication,
  SignInResult,
  User as FirebaseUser,
} from '@capacitor-firebase/authentication';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { tap, switchMap, catchError, map } from 'rxjs/operators';
import { StorageService } from '../helper/storage.service';

/**
 * Service d'authentification Firebase utilisant le plugin natif Capacitor
 * Supporte Google Sign-In et Email/Password
 */
@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  private static readonly STORAGE_KEY_TOKEN = 'FIREBASE_ID_TOKEN';
  private static readonly STORAGE_KEY_USER = 'FIREBASE_USER';

  private currentUser$ = new BehaviorSubject<FirebaseUser | null>(null);
  private idToken$ = new BehaviorSubject<string | null>(null);
  private cachedToken: string | null = null;

  constructor(
    private storage: StorageService,
    private router: Router,
  ) {
    this.initializeAuthListener();
    this.loadCachedToken();
  }

  /**
   * Initialise l'écoute des changements d'état d'authentification
   */
  private initializeAuthListener() {
    FirebaseAuthentication.addListener('authStateChange', (result) => {
      this.currentUser$.next(result.user);
      if (result.user) {
        this.updateIdToken();
      } else {
        this.idToken$.next(null);
        this.cachedToken = null;
        this.storage.set(FirebaseAuthService.STORAGE_KEY_TOKEN, null);
        this.storage.set(FirebaseAuthService.STORAGE_KEY_USER, null);
      }
    });

    // Récupérer l'utilisateur actuel au démarrage
    FirebaseAuthentication.getCurrentUser().then((result) => {
      this.currentUser$.next(result.user);
      if (result.user) {
        this.updateIdToken();
      }
    });
  }

  /**
   * Charge le token depuis le cache au démarrage
   */
  private loadCachedToken() {
    this.storage.get<string>(FirebaseAuthService.STORAGE_KEY_TOKEN).subscribe((token) => {
      if (token) {
        this.cachedToken = token;
        this.idToken$.next(token);
      }
    });
  }

  /**
   * Met à jour le token ID et le stocke
   */
  private async updateIdToken() {
    try {
      const result = await FirebaseAuthentication.getIdToken();
      const token = result.token;
      this.idToken$.next(token);
      this.cachedToken = token;
      this.storage.set(FirebaseAuthService.STORAGE_KEY_TOKEN, token);

      // Stocker les infos utilisateur
      const user = this.currentUser$.value;
      if (user) {
        this.storage.set(
          FirebaseAuthService.STORAGE_KEY_USER,
          JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoUrl,
          }),
        );
      }
    } catch (error) {
      console.error('Error getting ID token:', error);
    }
  }

  /**
   * Connexion avec Google (utilise le SDK natif)
   */
  signInWithGoogle(): Observable<SignInResult> {
    return from(
      FirebaseAuthentication.signInWithGoogle(),
    ).pipe(
      tap((result) => console.log('Signed in with Google:', result.user?.uid)),
      catchError((error) => {
        console.error('Google sign-in error:', error);
        throw error;
      }),
    );
  }

  /**
   * Connexion avec Email/Password
   */
  signInWithEmail(email: string, password: string): Observable<SignInResult> {
    return from(
      FirebaseAuthentication.signInWithEmailAndPassword({ email, password }),
    ).pipe(
      tap((result) => console.log('Signed in with email:', result.user?.uid)),
      catchError((error) => {
        console.error('Email sign-in error:', error);
        throw error;
      }),
    );
  }

  /**
   * Inscription avec Email/Password
   */
  registerWithEmail(email: string, password: string): Observable<SignInResult> {
    return from(
      FirebaseAuthentication.createUserWithEmailAndPassword({ email, password }),
    ).pipe(
      tap((result) => console.log('Registered user:', result.user?.uid)),
      catchError((error) => {
        console.error('Email registration error:', error);
        throw error;
      }),
    );
  }

  /**
   * Déconnexion
   */
  signOut(): Observable<void> {
    return from(FirebaseAuthentication.signOut()).pipe(
      tap(() => {
        this.currentUser$.next(null);
        this.idToken$.next(null);
        this.cachedToken = null;
        this.router.navigateByUrl('/tabs/feed');
      }),
      catchError((error) => {
        console.error('Sign out error:', error);
        throw error;
      }),
    );
  }

  /**
   * Retourne un Observable de l'utilisateur courant
   */
  getCurrentUser(): Observable<FirebaseUser | null> {
    return this.currentUser$.asObservable();
  }

  /**
   * Retourne un Observable du token ID
   */
  getIdToken(): Observable<string | null> {
    return this.idToken$.asObservable();
  }

  /**
   * Retourne le token ID en cache de manière synchrone (pour HttpService natif)
   */
  getCachedToken(): string | null {
    return this.cachedToken;
  }

  /**
   * Force le rafraîchissement du token ID
   */
  async getFreshIdToken(): Promise<string | null> {
    try {
      const result = await FirebaseAuthentication.getIdToken({ forceRefresh: true });
      const token = result.token;
      this.idToken$.next(token);
      this.cachedToken = token;
      this.storage.set(FirebaseAuthService.STORAGE_KEY_TOKEN, token);
      return token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return this.currentUser$.value !== null;
  }

  /**
   * Envoie un email de réinitialisation de mot de passe
   */
  sendPasswordResetEmail(email: string): Observable<void> {
    return from(FirebaseAuthentication.sendPasswordResetEmail({ email })).pipe(
      tap(() => console.log('Password reset email sent to:', email)),
      catchError((error) => {
        console.error('Password reset error:', error);
        throw error;
      }),
    );
  }
}

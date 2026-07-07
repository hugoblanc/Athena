import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

/**
 * Clé anonyme stable par appareil, pour la dédup serveur des votes roadmap
 * quand l'utilisateur n'est pas connecté (cf. athena_api IdeaVote.anonKey et
 * l'entête `X-Anon-Key`). Générée une fois, persistée via StorageService
 * (SQLite), puis réutilisée. Équivalent mobile de athena-pwa/src/lib/anon-key.ts.
 */
@Injectable({
  providedIn: 'root',
})
export class AnonKeyService {
  private cachedKey: string | null = null;

  constructor(private readonly storage: StorageService) {}

  /**
   * Retourne la clé anonyme de l'appareil, en la générant et la persistant
   * au premier appel. Les appels suivants utilisent la valeur en cache.
   */
  public getAnonKey(): Observable<string> {
    if (this.cachedKey) {
      return of(this.cachedKey);
    }

    return this.storage.get<string>(StorageService.ANON_KEY).pipe(
      switchMap((stored) => {
        if (stored) {
          return of(stored);
        }
        const generated = this.generateKey();
        this.storage.set(StorageService.ANON_KEY, generated);
        return of(generated);
      }),
      tap((key) => (this.cachedKey = key)),
    );
  }

  private generateKey(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

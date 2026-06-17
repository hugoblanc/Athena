import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AppConfig, MigrationBanner } from '../models/app-config';
import { HttpService } from './helper/http.service';
import { StorageService } from './helper/storage.service';

/**
 * Récupère la configuration distante (`GET /app-config`) au démarrage.
 *
 * Conçu pour **échouer en silence** : si l'API ne répond pas, la bannière reste
 * masquée. Aucune dépendance native nouvelle (réutilise HttpService + Ionic
 * Storage). Le `versionCode` est transmis pour permettre un ciblage côté API.
 */
@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private static readonly BASE_URL = `${environment.apiUrl}app-config`;
  /** Clé de persistance du « dismiss » de la bannière de migration. */
  private static readonly BANNER_DISMISSED = 'MIGRATION_BANNER_DISMISSED';

  /** Bannière à afficher (null tant que non chargée / si rien à montrer). */
  public readonly migrationBanner$ = new BehaviorSubject<MigrationBanner | null>(
    null,
  );

  constructor(
    private readonly http: HttpService,
    private readonly storage: StorageService,
  ) {}

  /** À appeler une fois au boot. Idempotent et non bloquant. */
  public init(): void {
    this.storage
      .get<boolean>(AppConfigService.BANNER_DISMISSED)
      .pipe(take(1))
      .subscribe((dismissed) => {
        if (dismissed) {
          return; // L'utilisateur a déjà fermé la bannière : on ne la recharge pas.
        }
        this.fetchConfig();
      });
  }

  /** Mémorise la fermeture et masque la bannière. */
  public dismissBanner(): void {
    this.storage.set(AppConfigService.BANNER_DISMISSED, true);
    this.migrationBanner$.next(null);
  }

  private async fetchConfig(): Promise<void> {
    let versionCode: string | undefined;
    try {
      const info = await App.getInfo();
      versionCode = info?.build; // Android : build === versionCode.
    } catch {
      versionCode = undefined; // Web / info indisponible : on n'envoie rien.
    }

    const url = versionCode
      ? `${AppConfigService.BASE_URL}?versionCode=${encodeURIComponent(versionCode)}`
      : AppConfigService.BASE_URL;

    this.requestConfig(url)
      .pipe(
        take(1),
        catchError(() => of(null)),
      )
      .subscribe((config) => {
        const banner = config?.migrationBanner;
        if (banner?.enabled) {
          this.migrationBanner$.next(banner);
        }
      });
  }

  private requestConfig(url: string): Observable<AppConfig | null> {
    return this.http.get<AppConfig>(url);
  }
}

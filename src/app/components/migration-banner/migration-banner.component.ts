import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { MigrationBanner } from '../../models/app-config';
import { AppConfigService } from '../../provider/app-config.service';

/**
 * Bannière flottante (en bas, au-dessus de la tab-bar) invitant les
 * utilisateurs de l'app native à migrer vers la PWA. Affichée uniquement si
 * l'API l'active à distance (`/app-config`). Non bloquante, dismissable. Le CTA
 * mène à la page native `/evolution` (la lettre), qui renvoie ensuite vers le
 * web. Masquée sur `/evolution` elle-même (redondant).
 */
@Component({
  selector: 'app-migration-banner',
  templateUrl: './migration-banner.component.html',
  styleUrls: ['./migration-banner.component.scss'],
})
export class MigrationBannerComponent implements OnInit {
  public banner$!: Observable<MigrationBanner | null>;

  constructor(
    private readonly appConfig: AppConfigService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    const url$ = this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    );
    this.banner$ = combineLatest([this.appConfig.migrationBanner$, url$]).pipe(
      map(([banner, url]) =>
        url.startsWith('/evolution') ? null : banner,
      ),
    );
  }

  public discover(): void {
    void this.router.navigateByUrl('/evolution');
  }

  public dismiss(): void {
    this.appConfig.dismissBanner();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MigrationBanner } from '../../models/app-config';
import { AppConfigService } from '../../provider/app-config.service';
import { LinkService } from '../../provider/helper/link.service';

/**
 * Bannière flottante (en bas, au-dessus de la tab-bar) invitant les
 * utilisateurs de l'app native à migrer vers la PWA. Affichée uniquement si
 * l'API l'active à distance (`/app-config`). Non bloquante, dismissable, avec
 * une note explicative dépliable.
 */
@Component({
  selector: 'app-migration-banner',
  templateUrl: './migration-banner.component.html',
  styleUrls: ['./migration-banner.component.scss'],
})
export class MigrationBannerComponent implements OnInit {
  public banner$!: Observable<MigrationBanner | null>;
  /** État déplié de la note « Pourquoi ? ». */
  public showWhy = false;

  constructor(
    private readonly appConfig: AppConfigService,
    private readonly linkService: LinkService,
  ) {}

  ngOnInit(): void {
    this.banner$ = this.appConfig.migrationBanner$;
  }

  public openPwa(url: string): void {
    this.linkService.launchInAppBrowser(url);
  }

  public toggleWhy(): void {
    this.showWhy = !this.showWhy;
  }

  public dismiss(): void {
    this.appConfig.dismissBanner();
  }
}

import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppConfigService } from '../../provider/app-config.service';
import { LinkService } from '../../provider/helper/link.service';

/**
 * Page native expliquant la migration vers la PWA. Atteinte depuis la bannière
 * de migration. Raconte le « pourquoi » dans l'app (instantané, narratif), puis
 * envoie vers la version web au moment du CTA, où l'installation a lieu.
 */
@Component({
  selector: 'bf-evolution',
  templateUrl: './evolution.page.html',
  styleUrls: ['./evolution.page.scss'],
})
export class EvolutionPage {
  /** Plateforme native courante : guide d'installation adapté. */
  public readonly isIos = Capacitor.getPlatform() === 'ios';

  constructor(
    private readonly linkService: LinkService,
    private readonly appConfig: AppConfigService,
  ) {}

  /** Ouvre la version web (navigateur système → l'install A2HS y est possible). */
  public openWeb(): void {
    this.appConfig.migrationBanner$.pipe(take(1)).subscribe((banner) => {
      const url = banner?.ctaUrl || environment.webAppUrl;
      this.linkService.launchInAppBrowser(url);
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MetaMediaService } from '../../../provider/meta-media/meta-media.service';

/**
 * Chip « posté par ce média » (à la Instagram) affiché en tête d'un article ou
 * d'une vidéo. Au clic, navigue vers la page du média (`/media/:key`) qui liste
 * tout le contenu de ce média.
 */
@Component({
  selector: 'ath-media-link',
  templateUrl: './media-link.component.html',
  styleUrls: ['./media-link.component.scss'],
})
export class MediaLinkComponent {
  constructor(
    private readonly metaMediaService: MetaMediaService,
    private readonly router: Router
  ) {}

  get media() {
    return this.metaMediaService.currentMetaMedia;
  }

  goToMedia(): void {
    if (this.media?.key) {
      this.router.navigate(['/media', this.media.key]);
    }
  }
}

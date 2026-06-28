import { Component, OnInit, ChangeDetectionStrategy, Input, Host, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MixedContent } from '../../../provider/content/mixed-content';
import { MetaMediaType } from '../../../models/meta-media/meta-media-type.enum';

@Component({
  selector: 'ath-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlePreviewComponent {

  @Input() mixedContent!: MixedContent;

  /** Passe à true si la version haute résolution YouTube n'existe pas. */
  imgFailed = false;

  get isVideo(): boolean {
    const type = this.mixedContent?.metaMedia?.type;
    return type === MetaMediaType.YOUTUBE || type === MetaMediaType.VIDEO;
  }

  /**
   * URL de l'image de couverture. Pour les miniatures YouTube basse résolution
   * (`mqdefault`/`hqdefault`), on tente la version `maxresdefault` (1280×720)
   * pour éviter le rendu pixelisé sur une carte plein-large ; en cas d'absence
   * (404), `onImgError` repasse sur l'URL d'origine.
   */
  get imageUrl(): string | undefined {
    const url: string | undefined = this.mixedContent?.image?.url;
    if (!url || this.imgFailed) {
      return url;
    }
    return url.replace(
      /^(https?:\/\/i\.ytimg\.com\/vi\/[^/]+\/)[\w-]+\.jpg(\?.*)?$/,
      '$1maxresdefault.jpg$2'
    );
  }

  onImgError(): void {
    if (!this.imgFailed) {
      this.imgFailed = true;
    }
  }

  @HostListener('click')
  onClick() {
    this.goToContentDetails();
  }

  constructor(private readonly router: Router) { }

  private goToContentDetails() {
    this.router.navigate(['/', 'media', this.mixedContent.metaMedia.key, 'details', this.mixedContent.resourceId]);
  }


}

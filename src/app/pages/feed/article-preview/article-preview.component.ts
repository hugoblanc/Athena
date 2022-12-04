import { Component, OnInit, ChangeDetectionStrategy, Input, Host, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MixedContent } from '../../../provider/content/mixed-content';

@Component({
  selector: 'ath-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlePreviewComponent {

  @Input() mixedContent!: MixedContent;

  @HostListener('click')
  onClick() {
    this.goToContentDetails();
  }

  constructor(private readonly router: Router) { }

  private goToContentDetails() {
    this.router.navigate(['/', 'media', this.mixedContent.metaMedia.key, 'details', this.mixedContent.resourceId]);
  }


}

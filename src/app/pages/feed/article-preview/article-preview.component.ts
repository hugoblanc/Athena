import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MixedContent } from '../../../provider/content/mixed-content';

@Component({
  selector: 'ath-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlePreviewComponent implements OnInit {

  @Input() mixedContent: MixedContent;

  constructor() { }

  ngOnInit(): void {
  }

}

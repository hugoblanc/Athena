import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ath-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {

  @Input() article: any;
  @Input() mediaId: number;

  constructor() { }

  ngOnInit() {}

}

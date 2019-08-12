import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../models/content/wordpress/post';

@Component({
  selector: 'ath-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {

  @Input() article: Post;
  @Input() metaMediaKey: string;

  constructor() { }

  ngOnInit() {}

}

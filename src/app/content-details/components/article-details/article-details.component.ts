import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../models/content/wordpress/post';

@Component({
  selector: 'ath-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit() {}

}

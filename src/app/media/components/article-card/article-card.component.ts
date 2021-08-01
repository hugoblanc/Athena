import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../../../models/content/wordpress/post";
import { StorageService } from "../../../provider/helper/storage.service";
import { isOlderThanAWeek } from "../../../utils/date.utils";
import { AbstractContentCard } from "../abstract/abstract-content-card";

/**
 * Ce composant permet d'afficher le contenu des article wordpress
 */
@Component({
  selector: "ath-article-card",
  templateUrl: "./article-card.component.html",
  styleUrls: ["./article-card.component.scss"],
})
export class ArticleCardComponent
  extends AbstractContentCard
  implements OnInit
{
  @Input() article: Post = new Post();
  @Input() metaMediaKey: string;
  creationDate: Date;
  contentId: string | number;

  get isNew() {
    return !isOlderThanAWeek(this.article.publishedAt) && !this.isRead;
  }

  isRead = false;

  constructor(protected readonly storage: StorageService) {
    super(storage);
  }

  ngOnInit() {
    this.creationDate = this.article.publishedAt;
    this.contentId = this.article.contentId;
    super.ngOnInit();
  }
}

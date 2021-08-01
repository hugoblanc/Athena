import { Component, Input, OnInit } from "@angular/core";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { Post } from "../../../models/content/wordpress/post";

/**
 * Ce composant représente le contenu d'un article
 * Il doit englober tout ce qui est propre aux articles
 */
@Component({
  selector: "ath-article-details",
  templateUrl: "./article-details.component.html",
  styleUrls: ["./article-details.component.scss"],
})
export class ArticleDetailsComponent implements OnInit {
  @Input() post: Post;

  constructor(private socialSharing: SocialSharing) {}

  ngOnInit() {}

  async shareArticle() {
    await this.socialSharing.share(
      "Voici un article que j'ai trouvé sur Athena",
      null,
      null,
      this.post.link
    );
  }
}

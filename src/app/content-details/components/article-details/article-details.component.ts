import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../../../models/content/wordpress/post";
import { Share } from '@capacitor/share';

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


  ngOnInit() {}

  async shareArticle() {
    await Share.share({
      title: "Regarde cet article",
      text: "J'ai trouvé ça sur Athena app: ",
      url: this.post.link,
      dialogTitle: 'Informes tes amis',
    });
  }
}

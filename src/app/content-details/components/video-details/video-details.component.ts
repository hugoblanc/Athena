import { Component, Input, OnInit } from "@angular/core";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { ItemVideo } from "../../../models/content/youtube/item-video";

/**
 * Ce composant englobe tous les détails propre aux vidéos
 *
 */
@Component({
  selector: "ath-video-details",
  templateUrl: "./video-details.component.html",
  styleUrls: ["./video-details.component.scss"],
})
export class VideoDetailsComponent implements OnInit {
  @Input() video: ItemVideo;

  constructor(private socialSharing: SocialSharing) {}

  ngOnInit() {}

  async shareVideo() {
    await this.socialSharing.share(
      "Voici un vidéo que j'ai trouvé sur Athena",
      null,
      null,
      "https://www.youtube.com/watch?v=" + this.video.contentId
    );
  }
}

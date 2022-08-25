import { Component, Input, OnInit } from "@angular/core";
import { Share } from '@capacitor/share';
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


  ngOnInit() {}

  async shareVideo() {
    await Share.share({
      title: "Regarde cette vidéo",
      text: "J'ai trouvé ça sur Athena app: ",
      url: "https://www.youtube.com/watch?v=" + this.video.contentId,
      dialogTitle: 'Informes tes amis',
    });
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { ItemVideo } from "../../../models/content/youtube/item-video";
import { StorageService } from "../../../provider/helper/storage.service";
import { isOlderThanAWeek } from "../../../utils/date.utils";
import { AbstractContentCard } from "../abstract/abstract-content-card";

/**
 * Ce composant est l'élément qui permet d'afficher une card de vidéo youtube
 */
@Component({
  selector: "ath-video-card",
  templateUrl: "./video-card.component.html",
  styleUrls: ["./video-card.component.scss"],
})
export class VideoCardComponent extends AbstractContentCard implements OnInit {
  @Input() video: ItemVideo;
  @Input() metaMediaKey: string;
  creationDate: Date;
  contentId: string | number;

  isRead = false;

  get isNew() {
    return !isOlderThanAWeek(this.video.publishedAt) && !this.isRead;
  }

  constructor(protected readonly storage: StorageService) {
    super(storage);
  }

  ngOnInit() {
    this.creationDate = this.video.publishedAt;
    this.contentId = this.video.contentId;
    super.ngOnInit();
  }
}

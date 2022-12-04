import { Component, Input, OnInit } from "@angular/core";
import { MetaMediaService } from "../../../provider/meta-media/meta-media.service";

/**
 * *~~~~~~~~~~~~~~~~~~~
 * Author: HugoBlanc |
 * *~~~~~~~~~~~~~~~~~~~
 * Ce composant rassemble en un les deux type de sous composant
 * Si le flux est de type youtube ça affiche des video card
 * S'il est de type wordpress ça affiche des article-card
 * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
@Component({
  selector: "ath-content-list",
  templateUrl: "./content-list.component.html",
  styleUrls: ["./content-list.component.scss"],
})
export class ContentListComponent implements OnInit {
  @Input() contents!: any[];
  metaMediaKey!: string;
  constructor(private metaMediaService: MetaMediaService) { }

  ngOnInit() {
    // On set le media actuel pour trouver le type
    this.metaMediaKey = this.metaMediaService.currentMetaMedia.key;
  }
}

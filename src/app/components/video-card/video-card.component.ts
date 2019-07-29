import { Component, OnInit, Input } from '@angular/core';
import { ItemVideo } from '../../models/content/youtube/item-video';

@Component({
  selector: 'ath-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent implements OnInit {

  @Input() video: ItemVideo;
  @Input() metaMediaKey: string;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ItemVideo } from '../../../models/content/youtube/item-video';

@Component({
  selector: 'ath-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent implements OnInit {
  @Input() video: ItemVideo;


  constructor() { }

  ngOnInit() {
  }

}

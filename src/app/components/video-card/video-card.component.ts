import { Component, OnInit, Input } from '@angular/core';
import { ItemVideo } from '../../models/content/youtube/item-video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ath-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent implements OnInit {

  @Input() video: ItemVideo;
  @Input() metaMediaKey: string;

  link: SafeResourceUrl;
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.link = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' +
      this.video.snippet.resourceId.videoId +
      '?' +
      'modestbranding=1&' +
      'controls=0&' +
      'showinfo=0&'
      );
  }

}

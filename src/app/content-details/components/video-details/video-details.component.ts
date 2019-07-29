import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ItemVideo } from '../../../models/content/youtube/item-video';

@Component({
  selector: 'ath-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent implements OnInit {
  @Input() video: ItemVideo;
  @Input() videoId: string;

  link: SafeResourceUrl;
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.link = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' +
      this.videoId +
      '?' +
      'modestbranding=1&' +
      'controls=0&' +
      'showinfo=0&'
    );
  }

}

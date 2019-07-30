import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ath-youtube-iframe',
  templateUrl: './youtube-iframe.component.html',
  styleUrls: ['./youtube-iframe.component.scss'],
})
export class YoutubeIframeComponent implements OnInit {

  @Input() videoID: string;

  link: SafeResourceUrl;
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.link = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' +
      this.videoID +
      '?' +
      'modestbranding=1&' +
      'showinfo=0&'
    );
  }

}

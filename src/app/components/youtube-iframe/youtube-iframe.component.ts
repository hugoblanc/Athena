import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


/**
 * Ce composant prend un id de vidéo youtube en entré
 * et il s'occupe d'afficher automatiquement l'iframe
 * de manière responsive et en virant les infos inutiles
 */
@Component({
  selector: 'ath-youtube-iframe',
  templateUrl: './youtube-iframe.component.html',
  styleUrls: ['./youtube-iframe.component.scss'],
})
export class YoutubeIframeComponent implements OnInit {

  @Input() videoID!: string;

  link!: SafeResourceUrl;
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.link = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' +
      this.videoID +
      '?' +
      'modestbranding=1&' +
      'showinfo=0'
    );
  }

}

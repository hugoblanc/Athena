import { Component, OnInit } from '@angular/core';
import { MediasService } from '../medias.service';
import { MetaMedia } from '../models/meta-media';
import { YoutubeService } from '../provider/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  medias: MetaMedia[];
  videos: [];
  constructor(public mediasService: MediasService,
    public youtubeService:YoutubeService) { }


  ngOnInit(): void {
    this.medias = this.mediasService.medias;
    this.youtubeService.getVideosByPlaylistId('')
    .subscribe((videos) => {
      console.log(videos);
      this.videos = videos.items;
    });

    }
}

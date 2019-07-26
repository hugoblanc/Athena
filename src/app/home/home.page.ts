import { Component, OnInit } from '@angular/core';
import { MediasService } from '../provider/medias.service';
import { MetaMedia } from '../models/meta-media';
import { YoutubeService } from '../provider/youtube.service';
import { ListMetaMedias } from '../models/list-meta-medias';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listMetaMedia: ListMetaMedias[];
  videos: [];
  constructor(public mediasService: MediasService,
              public youtubeService: YoutubeService) { }


  ngOnInit(): void {
    this.listMetaMedia = this.mediasService.listMetaMedia;
    this.youtubeService.getVideosByPlaylistId('')
    .subscribe((videos) => {
      console.log(videos);
      this.videos = videos.items;
    });

    }
}

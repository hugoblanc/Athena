import { Component, OnInit } from '@angular/core';
import { MediasService } from '../provider/content/medias.service';
import { YoutubeService } from '../provider/content/youtube.service';
import { ListMetaMedias } from '../models/meta-media/list-meta-medias';

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

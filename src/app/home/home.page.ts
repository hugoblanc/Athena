import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseLib } from '@ionic-native/firebase-lib/ngx';
import { MediasService } from '../medias.service';
import { Router } from '@angular/router';
import { MetaMedia } from '../models/meta-media';
import { YoutubeService } from '../provider/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  medias: MetaMedia[];


  videos: any[] = [];
  constructor(public platform: Platform,
              public firebaseLib: FirebaseLib,
              public mediasService: MediasService,
              public router: Router,
              public youtubeService:YoutubeService) {

     }


  ngOnInit(): void {
    this.medias = this.mediasService.medias;
    this.platform.ready().then(() => {


      // Le subscribe au topic 'all' pour les notification
      this.firebaseLib.subscribe('all1')
        .then((data) => {
          console.log(data);
        });


      this.firebaseLib.onNotificationOpen()
        .subscribe((notification) => {
          console.log(notification);
          if (notification.tap) {
            const idMedia = this.mediasService.findMediaIdByKey(notification.key);
            this.router.navigateByUrl(`/media/${idMedia}/details/${notification.id}`);
          }
        }, (error) => {
          console.error(error);
        });


      this.youtubeService.getVideosByPlaylistId('')
          .subscribe((videos) => {
            console.log(videos);
            this.videos = videos.items;
          })

    });
  }
}

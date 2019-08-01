import { Component, OnInit } from '@angular/core';
import { ListMetaMedias } from '../models/meta-media/list-meta-medias';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public metaMediaService: MetaMediaService) { }

  listMetaMedia: ListMetaMedias[];
  videos: [];


  width: string;


  ngOnInit(): void {
    this.listMetaMedia = this.metaMediaService.listMetaMedia;

    setTimeout(() => {
      const slideRef = document.getElementById('slide-ref');
      this.width = slideRef.style.width;
      console.log(this.width);
    }, 1000);

  }

  ionViewDidEnter() {

  }


}

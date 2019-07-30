import { Component, OnInit } from '@angular/core';
import { ListMetaMedias } from '../models/meta-media/list-meta-medias';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listMetaMedia: ListMetaMedias[];
  videos: [];
  constructor(public metaMediaService: MetaMediaService) { }


  ngOnInit(): void {
    this.listMetaMedia = this.metaMediaService.listMetaMedia;
    }
}

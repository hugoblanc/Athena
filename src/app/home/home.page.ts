import { Component, OnInit, ViewChild } from '@angular/core';
import { ListMetaMedias } from '../models/meta-media/list-meta-medias';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';
import { IonReorderGroup, ModalController } from '@ionic/angular';

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

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;


  ngOnInit(): void {
    this.listMetaMedia = this.metaMediaService.listMetaMedia;
  }



}

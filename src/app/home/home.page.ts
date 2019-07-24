import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseLib } from '@ionic-native/firebase-lib/ngx';
import { MediasService } from '../medias.service';
import { Router } from '@angular/router';
import { MetaMedia } from '../models/meta-media';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  medias: MetaMedia[];

  constructor(public mediasService: MediasService) { }


  ngOnInit(): void {
    this.medias = this.mediasService.medias;
  }
}

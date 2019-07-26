import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediasService } from '../medias.service';
import { Post } from '../models/content/wordpress/post';
import { StyleService } from '../provider/style.service';
import { MetaMedia } from '../models/meta-media';
import { IonInfiniteScroll } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

/**
 * *~~~~~~~~~~~~~~~~~~~
 * Author: HugoBlanc |
 * *~~~~~~~~~~~~~~~~~~~
 * Cette page permet d'afficher la liste des articles
 * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
})
export class MediaPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  idMedia: number;
  posts: Post[];
  loading = false;

  currentMedia: MetaMedia;
  constructor(private route: ActivatedRoute,
              public mediasService: MediasService,
              public styleService: StyleService,
              public statusBar: StatusBar) { }

  ngOnInit() {
  }


  ionViewWillEnter() {

    // Initialisation de l'id courant
    const id = this.route.snapshot.paramMap.get('id');
    this.idMedia = parseInt(id, 10);

    // récupération des information du média associé
    this.currentMedia = this.mediasService.medias[this.idMedia];

    // Config de la couleur principale du media
    this.styleService.setPrimaryColor(this.currentMedia.color);

    // Initiailisation Récupération des données sur wordpress
    this.initData(this.currentMedia.url);
  }


  initData(url: string) {
    // Appel de la méhode du service
    this.loading = true;
    this.mediasService.getPostByUrl(url)
      .subscribe((posts: Post[]) => {
        // Affectation des données serveur dans notre variable local
        this.posts = posts;
        this.loading = false;
      }, (error) => {
        console.error(error);
        this.loading = false;
      });
  }

  loadMore(event) {
    this.mediasService.loadMorePosts(this.currentMedia.url)
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        event.target.complete();
      }, (error) => {
        event.target.complete();
      });
  }


  openExternalPage(url: string) {
    window.open(url, '_system’');
  }



}

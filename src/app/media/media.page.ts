import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediasService } from '../provider/content/medias.service';
import { Post } from '../models/content/wordpress/post';
import { StyleService } from '../provider/style.service';
import { MetaMedia } from '../models/meta-media/meta-media';
import { IonInfiniteScroll } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { contentServiceProvider } from '../provider/content/content.service.provider';
import { ContentService } from '../provider/content/content.service';
import { IContent } from '../models/content/icontent';

/**
 * *~~~~~~~~~~~~~~~~~~~
 * Author: HugoBlanc |
 * *~~~~~~~~~~~~~~~~~~~
 * Cette page permet d'afficher la liste content d'un meta media donné
 * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
  providers: [contentServiceProvider]
})
export class MediaPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  idMedia: number;
  posts: Post[];
  loading = false;

  currentMedia: MetaMedia;
  constructor(private route: ActivatedRoute,
              public mediasService: ContentService<IContent>,
              public styleService: StyleService,
              public statusBar: StatusBar) { }

  ngOnInit() {
  }


  ionViewWillEnter() {

    // Récupération de la key du metamedia cible
    const key = this.route.snapshot.paramMap.get('key');

    // récupération des information du média associé
    this.currentMedia = this.mediasService.setAndGetCurrentMediaKey(key);

    // Config de la couleur principale du media
    // TODO: Voir si ça vaut le coup de faire un gradient en fonctoin de la couleur du media
    // this.styleService.setPrimaryColor();

    // Initiailisation Récupération des données sur wordpress
    this.initData();
  }


  initData() {
    // Appel de la méhode du service
    this.loading = true;
    this.mediasService.getContents()
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
    this.mediasService.loadMore()
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

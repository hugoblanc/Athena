import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StyleService } from '../provider/style.service';
import { MetaMedia } from '../models/meta-media/meta-media';
import { IonInfiniteScroll } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ContentService } from '../provider/content/content.service';
import { IContent } from '../models/content/icontent';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';
import { contentServiceProvider } from '../provider/content/content.service.provider';
import { Page } from '../models/core/page';

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
  page: Page<IContent>;
  loading = false;

  currentMedia: MetaMedia;
  constructor(private route: ActivatedRoute,
              public mediasService: ContentService<IContent>,
              public metaMediaService: MetaMediaService,
              public styleService: StyleService,
              public statusBar: StatusBar) {

  }

  ngOnInit() {
    // Récupération de la key du metamedia cible
    const key = this.route.snapshot.paramMap.get('key');

    // récupération des information du média associé
    this.currentMedia = this.metaMediaService.currentMetaMedia;

    // Config de la couleur principale du media
    // TODO: Voir si ça vaut le coup de faire un gradient en fonctoin de la couleur du media
    // this.styleService.setPrimaryColor();

    // Initiailisation Récupération des données sur wordpress
    this.initData();
  }


  ionViewWillEnter() {


  }


  initData() {
    // Appel de la méhode du service
    this.loading = true;
    this.mediasService.getContents()
      .subscribe((page: Page<IContent>) => {
        // Affectation des données serveur dans notre variable local
        this.page = page;
        this.loading = false;
      }, (error) => {
        console.error(error);
        this.loading = false;
      });
  }

  loadMore(event) {
    this.mediasService.loadMore()
      .subscribe((page: Page<IContent>) => {
        this.page = page;
        event.target.complete();
      }, (error) => {
        event.target.complete();
      });
  }


  openExternalPage(url: string) {
    window.open(url, '_system’');
  }



}

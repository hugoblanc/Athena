import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
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
 * Les MetaMedia sont les informations que l'on a au sujet des media
 * leurs nom, photos, types, ...
 * Le content service est injecté dynamiquement grace au mécanisme de logique implémenté dans contentServiceProvider.ts
 * Globalement en fonction du type de currentMEtaMedia set dans MetaMediaService on va injecte run youtubeservice ou
 * wordpressService
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
              public contentService: ContentService<IContent>,
              public metaMediaService: MetaMediaService,
              public styleService: StyleService,
              public statusBar: StatusBar,
              private zone: NgZone) {

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


  /**
   * Cette methode est délcanché quand l'utilisateur arrive sur la page
   */
  initData() {
    // Appel de la méhode du service
    this.loading = true;
    // Grace a l'injection dynamique, on sait à l'execution quel service sera executer
    // outubeService ou WordpressService
    this.contentService.getContents()
      .subscribe((page: Page<IContent>) => {
        // Affectation des données serveur dans notre variable local
        this.zone.run(() => {
          this.page = page;
          this.loading = false;
        });
      }, (error) => {
        this.zone.run(() => {
          console.error(error);
          this.loading = false;
        });
      });
  }

  /**
   * Cette methode est déclanché quand l'utilisateur scroll tout en bas de son téléphone
   * @param event l'event javascript
   */
  loadMore(event) {
        // Grace a l'injection dynamique, on sait à l'execution quel service sera executer
    // outubeService ou WordpressService
    this.contentService.loadMore()
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

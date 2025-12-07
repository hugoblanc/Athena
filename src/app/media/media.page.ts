import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContent } from '../models/content/icontent';
import { Page } from '../models/core/page';
import { MetaMedia } from '../models/meta-media/meta-media';
import { ContentService } from '../provider/content/content.service';
import { contentServiceProvider } from '../provider/content/content.service.provider';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';

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
  idMedia!: number;
  page?: Page<IContent>;
  loading = false;
  currentMedia!: MetaMedia;

  constructor(public contentService: ContentService<IContent>,
    public metaMediaService: MetaMediaService) {

  }

  ngOnInit() {

    // récupération des information du média associé
    this.currentMedia = this.metaMediaService.currentMetaMedia;

    // Initiailisation Récupération des données sur wordpress ou autre
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
        this.page = page;
        this.loading = false;
      }, (error) => {
        console.error("error media page");
        console.error(error);
        this.loading = false;
      });
  }

  doRefresh(event: any) {
    this.loading = true;
    this.contentService.getContents()
      .subscribe((page: Page<IContent>) => {
        this.page = page;
        this.loading = false;
        event.target.complete();
      }, (error) => {
        console.error("error media page refresh");
        console.error(error);
        this.loading = false;
        event.target.complete();
      });
  }

  /**
   * Cette methode est déclanché quand l'utilisateur scroll tout en bas de son téléphone
   * @param event l'event javascript
   */
  loadMore(event: any) {
    // Grace a l'injection dynamique, on sait à l'execution quel service sera executer
    // outubeService ou WordpressService
    this.contentService.loadMore()
      .subscribe((page: Page<IContent>) => {
        this.page = page;
        event.target.complete();
      }, () => {
        event.target.complete();
      });
  }


  openExternalPage(url: string) {
    window.open(url, '_system’');
  }



}

import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetaMedia } from '../models/meta-media/meta-media';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';
import { IContent } from '../models/content/icontent';
import { contentServiceProvider } from '../provider/content/content.service.provider';
import { ContentService } from '../provider/content/content.service';
import { StyleService } from '../provider/style.service';

/**
 * *~~~~~~~~~~~~~~~~~~~
 * Author: HugoBlanc |
 * *~~~~~~~~~~~~~~~~~~~
 * Cette page permet d'afficher les détails d'un article une fois qu'on a cliqué dessus
 * Sa grand espécificité réside dans le provider du contentService
 * En effet le service qui sera fournis au moment de la DI(dependecy injection) dépend du currentMetaMedia
 * Si le metaMedia est de type youtube: on injectera le youtubeService, s'il est wordpress, on inject wordpressService ...
 * Pour mieux compprendre le mecanisme, vous pouvez aller voir le current-meta-media.guard.ts et surtout contentServiceProvider.ts
 * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
@Component({
  selector: 'app-post-details',
  templateUrl: './content-details.page.html',
  styleUrls: ['./content-details.page.scss'],
  providers: [contentServiceProvider]
})
export class ContentDetailsPage implements OnInit, OnDestroy {

  id: number;
  content: IContent;
  currentMedia: MetaMedia;

  constructor(private route: ActivatedRoute,
              public contentService: ContentService<IContent>,
              public metaMediaService: MetaMediaService,
              public styleService: StyleService,
              private zone: NgZone) { }

  ionViewWillEnter() {
    // Quand on arrive sur cette page, on récupère l'id dans l'url
    const idPost = this.route.snapshot.paramMap.get('id');
    // il s'agit de l'id du contenu
    this.id = parseInt(idPost, 10);
    // On récupère aussi le currentMetaMedia
    this.currentMedia = this.metaMediaService.currentMetaMedia;

    // Comme on utilise un plugin pour les call en natif sur mobile il faut forcer la zone angular
    // Si on fait pas ça bug a l'affichage
    this.zone.run(() => {
      // On cherche en local puis si rien en locq on cherche coté serveur
      this.contentService.getContentById(this.id)
        .subscribe((content) => {
          this.content = content;
        });
    });
  }

  /**
   * Cette methode permet de basculer en mode nuit
   */
  switchNightMode() {
    this.styleService.switchNightMode();
  }

  /**
   * Quand on arrive sur cette page il faut gérer les réglages de l'utilisateur
   * S'il a réglé en blanc il faut rétablir ce régale pour la page
   */
  ngOnInit() {
    this.styleService.initPage();
  }

  /**
   * Quand il quitte la page il faut rétablir dans le sens inverse si besoin
   */
  ngOnDestroy(): void {
    this.styleService.leavePage();
  }

  /**
   *
   * @param url Methode qui sera peut être utilisé pour les lien de payement
   */
  openExternalPage(url: string) {
    window.open(url, '_system’');
  }

}

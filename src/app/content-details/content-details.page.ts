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
    const idPost = this.route.snapshot.paramMap.get('id');
    this.id = parseInt(idPost, 10);
    this.currentMedia = this.metaMediaService.currentMetaMedia;

    // Comme on utilise un plugin pour les call en natif sur mobile il faut forcer la zone angular
    // Si on fait pas ça bug a l'affichage
    this.zone.run(() => {
      // On cherche en locql puis si rien en locq on cherche coté serveur
      this.contentService.getContentById(this.id)
        .subscribe((content) => {
          this.content = content;
        });
    });
  }

  switchNightMode() {
    this.styleService.switchNightMode();
  }


  ngOnInit() {
    this.styleService.initPage();
  }

  ngOnDestroy(): void {
    this.styleService.leavePage();
  }

  openExternalPage(url: string) {
    window.open(url, '_system’');
  }

}

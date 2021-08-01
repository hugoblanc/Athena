import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IonContent } from "@ionic/angular";
import { ScrollDetail } from "@ionic/core/dist/types/components/content/content-interface";
import { Helpable } from "../core/interfaces/helpable.interface";
import { IContent } from "../models/content/icontent";
import { ContentService } from "../provider/content/content.service";
import { contentServiceProvider } from "../provider/content/content.service.provider";
import { HelpService } from "../provider/helper/help.service";
import { LinkService } from "../provider/helper/link.service";
import { StorageService } from "../provider/helper/storage.service";
import { StyleService } from "../provider/style.service";

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
  selector: "app-post-details",
  templateUrl: "./content-details.page.html",
  styleUrls: ["./content-details.page.scss"],
  providers: [contentServiceProvider],
})
export class ContentDetailsPage implements OnInit, OnDestroy, Helpable {
  constructor(
    private route: ActivatedRoute,
    public contentService: ContentService<IContent>,
    public styleService: StyleService,
    public linkService: LinkService,
    public helpService: HelpService,
    public element: ElementRef,
    private zone: NgZone,
    private readonly storage: StorageService
  ) {}

  private static scrollDeltaY = -500;

  @ViewChild(IonContent, { static: false }) ionContent: IonContent;
  private helpTriggered = false;

  private id: number;
  content: IContent;
  PAGE_CODE = "content-details";

  ionViewWillEnter() {
    // Quand on arrive sur cette page, on récupère l'id dans l'url
    const idPost = this.route.snapshot.paramMap.get("id");
    const key = this.route.snapshot.paramMap.get("key");
    // il s'agit de l'id du contenu
    this.id = parseInt(idPost, 10);

    // Comme on utilise un plugin pour les call en natif sur mobile il faut forcer la zone angular
    // Si on fait pas ça bug a l'affichage
    // On cherche en local puis si rien en local on cherche coté serveur
    this.contentService.getContentById(this.id).subscribe((content) => {
      this.zone.run(() => {
        this.content = content;
      });
    });

    setTimeout(() => {
      if (this.content && this.content.contentId) {
        this.storage.set(key + this.content.contentId, true);
      }
    }, 15000);
  }

  /**
   * Quand on arrive sur cette page il faut gérer les réglages de l'utilisateur
   * S'il a réglé en blanc il faut rétablir ce réglage pour la page
   */
  ngOnInit() {
    this.styleService.initPage();
    this.linkService.enableDynamicHyperlinks(this.element);
  }

  /**
   * Quand il quitte la page il faut rétablir dans le sens inverse si besoin
   */
  ngOnDestroy(): void {
    this.styleService.leavePage();
  }

  onScroll(scrollEvent: CustomEvent<ScrollDetail>) {
    const deltaY = scrollEvent.detail.deltaY;
    if (deltaY < ContentDetailsPage.scrollDeltaY && !this.helpTriggered) {
      this.helpTriggered = true;
      this.displayHelp();
    }
  }

  async displayHelp() {
    await this.helpService.displayHelp(this.PAGE_CODE);
  }

  /**
   *
   * @param url Methode qui sera peut être utilisé pour les lien de payement
   */
  openExternalPage(url: string) {
    window.open(url, "_system’");
  }

  async scrollTop() {
    await this.ionContent.scrollToTop(500);
  }
}

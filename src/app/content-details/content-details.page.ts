import {
  Component,
  ElementRef, OnDestroy,
  OnInit,
  ViewChild
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
import { shareContent } from './utils/shareable-content.utils';

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
    private readonly storage: StorageService
  ) { }

  private static scrollDeltaY = -500;

  @ViewChild(IonContent) ionContent: IonContent;
  private helpTriggered = false;

  private id: number;
  key: string;
  content: IContent;
  PAGE_CODE = "content-details";
  private maxHeight: number;
  readingProgress = 0;

  ionViewWillEnter() {
    // Quand on arrive sur cette page, on récupère l'id dans l'url
    const idPost = this.route.snapshot.paramMap.get("id");
    this.key = this.route.snapshot.paramMap.get("key");
    // il s'agit de l'id du contenu
    this.id = parseInt(idPost, 10);

    // On cherche en local puis si rien en local on cherche coté serveur
    this.contentService.getContentById(this.id).subscribe((content) => {
      this.content = content;
      this.content.id = this.id;
    });

    this.markContentAsRead(this.key);
  }

  /**
   * Quand on arrive sur cette page il faut gérer les réglages de l'utilisateur
   * S'il a réglé en blanc il faut rétablir ce réglage pour la page
   */
  ngOnInit() {
    this.styleService.initPage();
    this.linkService.enableDynamicHyperlinks(this.element);
  }

  async ngAfterViewInit(): Promise<void> {
    setTimeout(async () => {
      const scrollElement = await this.ionContent.getScrollElement();
      this.maxHeight = scrollElement.scrollHeight;
    }, 100);
  }
  /**
   * Quand il quitte la page il faut rétablir dans le sens inverse si besoin
   */
  ngOnDestroy(): void {
    this.styleService.leavePage();
  }

  onScroll(scrollEvent: CustomEvent<ScrollDetail>) {
    const deltaY = scrollEvent.detail.deltaY;
    this.readingProgress =
      (scrollEvent.detail.scrollTop / (this.maxHeight - window.innerHeight)) *
      100;
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

  async shareContent() {
    await shareContent(this.key, this.id, "Regarde ce que j'ai trouvé")
  }

  async scrollTop() {
    await this.ionContent.scrollToTop(500);
  }

  private markContentAsRead(key: string) {
    setTimeout(() => {
      if (this.content && this.content.contentId) {
        this.storage.set(key + this.content.contentId, true);
      }
    }, 15000);
  }
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll, ModalController } from "@ionic/angular";
import { InputChangeEventDetail } from "@ionic/core/dist/types/interface";
import { StorageService } from "../../provider/helper/storage.service";
import { MixedContent } from "../../provider/content/mixed-content";
import { MixedContentService } from "../../provider/content/mixed-content.service";
import { FeedFilterModalComponent } from "./feed-filter-modal/feed-filter-modal.component";

@Component({
  selector: "app-feed",
  templateUrl: "feed.page.html",
  styleUrls: ["feed.page.scss"],
})
export class FeedPage implements OnInit {
  private static FEED_FILTER_KEY = 'FEED_FILTER_MEDIA_KEYS';

  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  contents: MixedContent[] = [];
  hasActiveFilter = false;

  private page: number | undefined = 1;
  private size = 15;
  private terms = "";
  private mediaKeys: string[] = [];

  constructor(
    public mixedContentService: MixedContentService,
    private modalController: ModalController,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.loadFilterPreferences();
  }

  searchTermsChanged(terms: CustomEvent<InputChangeEventDetail>) {
    this.terms = terms.detail.value ?? '';
    this.initSearch();
  }

  loadNextContent(event?: any) {
    if (this.page === undefined) {
      console.log("End of page");
      return;
    }

    const mediaKeysParam = this.mediaKeys.length > 0 ? this.mediaKeys.join(',') : undefined;

    this.mixedContentService
      .getLastFeedContent(this.page, this.size, this.terms, mediaKeysParam)
      .subscribe((pageResult) => {
        this.contents.push(...pageResult.objects);
        this.page = pageResult.next;
        if (event) {
          event.target.complete();
        }
        if (pageResult.next === undefined) {
          this.infiniteScroll.disabled = true;
        }
      });
  }

  private initSearch() {
    this.page = 1;
    this.contents = [];
    if (this.infiniteScroll?.disabled === true) {
      this.infiniteScroll.disabled = false;
    }
    this.loadNextContent();
  }

  private loadFilterPreferences() {
    this.storageService.get<string[]>(FeedPage.FEED_FILTER_KEY)
      .subscribe((savedKeys) => {
        if (savedKeys && savedKeys.length > 0) {
          this.mediaKeys = savedKeys;
          this.hasActiveFilter = true;
        }
        this.initSearch();
      });
  }

  async openFilterModal() {
    const modal = await this.modalController.create({
      component: FeedFilterModalComponent,
      breakpoints: [0, 0.9],
      initialBreakpoint: 0.9,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.hasChanges) {
      this.mediaKeys = data.selectedKeys;
      this.hasActiveFilter = this.mediaKeys.length > 0 && this.mediaKeys.length < this.getTotalMediaCount();
      this.initSearch();
    }
  }

  private getTotalMediaCount(): number {
    // Estimation du nombre total de médias
    // Cette valeur sera comparée avec le nombre de médias sélectionnés
    return 50; // Valeur par défaut suffisamment grande
  }
}

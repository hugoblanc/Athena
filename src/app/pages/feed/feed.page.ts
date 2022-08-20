import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { InputChangeEventDetail } from "@ionic/core/dist/types/interface";
import { MixedContent } from "../../provider/content/mixed-content";
import { MixedContentService } from "../../provider/content/mixed-content.service";

@Component({
  selector: "app-feed",
  templateUrl: "feed.page.html",
  styleUrls: ["feed.page.scss"],
})
export class FeedPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  contents: MixedContent[] = [];

  private page: number | undefined = 1;
  private size = 15;
  private terms = "";

  constructor(public mixedContentService: MixedContentService) {}

  ngOnInit(): void {
    this.initSearch();
  }

  searchTermsChanged(terms: CustomEvent<InputChangeEventDetail>) {
    this.terms = terms.detail.value;
    this.initSearch();
  }

  loadNextContent(event?: any) {
    if (this.page === undefined) {
      console.log("End of page");
    }

    this.mixedContentService
      .getLastFeedContent(this.page, this.size, this.terms)
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
}

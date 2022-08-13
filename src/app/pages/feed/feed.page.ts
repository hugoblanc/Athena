
import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/github/github';
import { ListMetaMedias } from '../../models/meta-media/list-meta-medias';
import { MixedContent } from '../../provider/content/mixed-content';
import { MixedContentService } from '../../provider/content/mixed-content.service';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss'],
})
export class FeedPage implements OnInit {


  contents: MixedContent[] = [];

  constructor(public mixedContentService: MixedContentService) {

  }

  listMetaMedia: ListMetaMedias[];
  videos: [];
  width: string;
  issues: Issue[] = [];
  loading = true;

  page: number | undefined = 1;
  size = 15;

  ngOnInit(): void {
    this.loadNextContent();
  }

  loadNextContent(event?:any) {
    if (this.page === undefined) {
      console.log('End of page');
    }
    this.loading = true;
    this.mixedContentService.getLastFeedContent(this.page, this.size).subscribe(pageResult => {
      this.contents.push(...pageResult.objects);
      this.page = pageResult.next;
      this.loading = false;
      if(event){
        event.target.complete();
        if(pageResult.next === undefined){
          event.target.disabled = true;
        }
      }
    });
  }


}

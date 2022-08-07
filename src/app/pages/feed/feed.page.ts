
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  lastContent$!: Observable<MixedContent[]>;

  constructor(public mixedContentService: MixedContentService) {

  }

  listMetaMedia: ListMetaMedias[];
  videos: [];
  width: string;
  issues: Issue[] = [];
  loading = true;


  ngOnInit(): void {
    this.lastContent$ = this.mixedContentService.getLastFeedContent();
  }


}

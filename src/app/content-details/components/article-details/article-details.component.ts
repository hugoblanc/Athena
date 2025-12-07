import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
import { Post } from "../../../models/content/wordpress/post";
import { AudioContentService, AudioContentUrl } from '../../../provider/content/audio-content.service';
import { MixedContentService, AthenaId } from '../../../provider/content/mixed-content.service';
import { MetaMediaService } from '../../../provider/meta-media/meta-media.service';
import { isNotNullOrUndefined } from '../../../utils/is-not-null-or-undefined/operator';

@Component({
  selector: "ath-article-details",
  templateUrl: "./article-details.component.html",
  styleUrls: ["./article-details.component.scss"],
})
export class ArticleDetailsComponent implements OnInit {

  @Input() post!: Post;
  @Input() key!: string;

  audio$!: Observable<AudioContentUrl | undefined>;

  get mediaName(): string {
    return this.metaMediaService.currentMetaMedia?.title ?? '';
  }

  isAudioPlaying = false;
  constructor(private readonly audioContentService: AudioContentService,
    private readonly mixedContentService: MixedContentService,
    private readonly metaMediaService: MetaMediaService) { }

  ngOnInit(): void {
    this.audio$ = this.mixedContentService.getIdFromContentIdAndMediaKey(this.key, this.post.contentId + '')
      .pipe(
        isNotNullOrUndefined(),
        mergeMap(({ id }) => this.audioContentService.getAudioContentUrlById(id))
      )
  }


}

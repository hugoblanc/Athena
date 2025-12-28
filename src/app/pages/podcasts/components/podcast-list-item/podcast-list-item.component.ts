import { Component, Input } from '@angular/core';
import { Podcast } from '../../../../models/podcast/podcast.model';

@Component({
  selector: 'app-podcast-list-item',
  templateUrl: './podcast-list-item.component.html',
  styleUrls: ['./podcast-list-item.component.scss'],
})
export class PodcastListItemComponent {
  @Input() podcast!: Podcast;
}

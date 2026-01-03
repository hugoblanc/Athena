import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PodcastsPageRoutingModule } from './podcasts-routing.module';
import { PodcastsPage } from './podcasts.page';
import { PodcastPlayerComponent } from './components/podcast-player/podcast-player.component';
import { PodcastListItemComponent } from './components/podcast-list-item/podcast-list-item.component';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { DecodeHtmlPipe } from '../../core/pipes/decode-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PodcastsPageRoutingModule
  ],
  declarations: [
    PodcastsPage,
    PodcastPlayerComponent,
    PodcastListItemComponent,
    FormatTimePipe,
    DecodeHtmlPipe
  ]
})
export class PodcastsPageModule {}

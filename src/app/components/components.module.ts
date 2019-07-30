import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthLoaderComponent } from './ath-loader/ath-loader.component';
import { IonicModule } from '@ionic/angular';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { CardComponent } from './card/card.component';
import { MediaNotifToggleComponent } from './media-notif-toggle/media-notif-toggle.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { ImgComponent } from './img/img.component';
import { ContentListComponent } from './content-list/content-list.component';
import { RouterModule } from '@angular/router';
import { ArticleCardComponent } from './article-card/article-card.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { YoutubeIframeComponent } from './youtube-iframe/youtube-iframe.component';

@NgModule({
  declarations: [AthLoaderComponent,
    HorizontalComponent,
    CardComponent,
    MediaNotifToggleComponent,
    ContentListComponent,
    ImgComponent,
    ArticleCardComponent,
    VideoCardComponent,
    YoutubeIframeComponent
  ],
  exports: [AthLoaderComponent,
    HorizontalComponent,
    CardComponent,
    MediaNotifToggleComponent,
    ContentListComponent,
    ImgComponent,
    ArticleCardComponent,
    VideoCardComponent,
    YoutubeIframeComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    NgxMasonryModule,
    RouterModule
  ]
})
export class ComponentsModule { }

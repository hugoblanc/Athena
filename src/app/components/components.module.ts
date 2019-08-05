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
import { Slides3dComponent } from './slides3d/slides3d.component';
import { SectionComponent } from './section/section.component';
import { ReorderComponent } from './reorder/reorder.component';
import { HeaderModalComponent } from './header-modal/header-modal.component';

@NgModule({
  declarations: [AthLoaderComponent,
    HorizontalComponent,
    CardComponent,
    MediaNotifToggleComponent,
    ContentListComponent,
    ImgComponent,
    ArticleCardComponent,
    VideoCardComponent,
    YoutubeIframeComponent,
    Slides3dComponent,
    SectionComponent,
    ReorderComponent,
    HeaderModalComponent
  ],
  exports: [AthLoaderComponent,
    HorizontalComponent,
    CardComponent,
    MediaNotifToggleComponent,
    ContentListComponent,
    ImgComponent,
    ArticleCardComponent,
    VideoCardComponent,
    YoutubeIframeComponent,
    Slides3dComponent,
    SectionComponent,
    ReorderComponent,
    HeaderModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    NgxMasonryModule,
    RouterModule
  ]
})
export class ComponentsModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { NgxMasonryModule } from 'ngx-masonry';
import { ComponentsModule } from '../components/components.module';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ContentListComponent } from './components/content-list/content-list.component';
import { MediaPage } from './media.page';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { MediaNotifToggleComponent } from './components/media-notif-toggle/media-notif-toggle.component';



const routes: Routes = [
  {
    path: '',
    component: MediaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgxMasonryModule
  ],
  declarations: [MediaPage, ContentListComponent,
    MediaNotifToggleComponent,
    ArticleCardComponent,
    VideoCardComponent],
  providers: [StatusBar]
})
export class MediaPageModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ContentListComponent } from './components/content-list/content-list.component';
import { MediaNotifToggleComponent } from './components/media-notif-toggle/media-notif-toggle.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { MediaPage } from './media.page';



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
    ComponentsModule
  ],
  declarations: [MediaPage, ContentListComponent,
    MediaNotifToggleComponent,
    ArticleCardComponent,
    VideoCardComponent],
})
export class MediaPageModule { }

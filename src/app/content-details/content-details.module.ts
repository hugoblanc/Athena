import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContentDetailsPage } from './content-details.page';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { VideoDetailsComponent } from './components/video-details/video-details.component';

const routes: Routes = [
  {
    path: '',
    component: ContentDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContentDetailsPage, ArticleDetailsComponent, VideoDetailsComponent],
  exports: [ArticleDetailsComponent, VideoDetailsComponent]
})
export class ContentDetailsPageModule {}

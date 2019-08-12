import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContentDetailsPage } from './content-details.page';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { VideoDetailsComponent } from './components/video-details/video-details.component';
import { ComponentsModule } from '../components/components.module';

/**
 * Ce module concerne la page des détails d'un contenu
 * Le contenu peut être de plusieurs type
 * Wordpress (Post) et youtube(ItemVideo) en font partie
 */
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
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [ContentDetailsPage, ArticleDetailsComponent, VideoDetailsComponent],
  exports: [ArticleDetailsComponent, VideoDetailsComponent]
})
export class ContentDetailsPageModule { }

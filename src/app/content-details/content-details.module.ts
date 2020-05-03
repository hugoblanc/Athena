import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContentDetailsPage } from './content-details.page';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { VideoDetailsComponent } from './components/video-details/video-details.component';
import { ComponentsModule } from '../components/components.module';
import { VideoHeaderComponent } from './components/video-header/video-header.component';
import { MoonModeComponent } from './components/moon-mode/moon-mode.component';
import { DirectivesModule } from '../directives/directives.module';

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
    ComponentsModule,
    DirectivesModule
  ],
  declarations: [
    ContentDetailsPage,
    ArticleDetailsComponent,
    VideoDetailsComponent,
    VideoHeaderComponent,
    MoonModeComponent
  ],
  exports: [ArticleDetailsComponent, VideoDetailsComponent]
})
export class ContentDetailsPageModule { }



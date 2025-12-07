import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';
import { FeedPage } from './feed.page';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { FeedFilterModalComponent } from './feed-filter-modal/feed-filter-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: FeedPage
      }
    ]),
    ComponentsModule
  ],
  declarations: [FeedPage, ArticlePreviewComponent, FeedFilterModalComponent],
})
export class FeedPageModule { }

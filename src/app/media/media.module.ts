import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MediaPage } from './media.page';
import { ComponentsModule } from '../components/components.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgxMasonryModule } from 'ngx-masonry';

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
  declarations: [MediaPage],
  providers: [StatusBar]
})
export class MediaPageModule {}

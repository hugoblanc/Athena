import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InformationsPage } from './informations.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

const routes: Routes = [
  {
    path: '',
    component: InformationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InformationsPage],
  providers: [StatusBar]
})
export class InformationsPageModule {}

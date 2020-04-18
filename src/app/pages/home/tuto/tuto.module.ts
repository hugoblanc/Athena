import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TutoPage } from './tuto.page';
import { IssueModule } from '../../construction/issue/issue.module';

const routes: Routes = [
  {
    path: '',
    component: TutoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TutoPage]
})
export class TutoPageModule {}

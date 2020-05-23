import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IssueModule } from '../construction/components/issue/issue.module';
import { TutoPage } from './tuto.page';



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

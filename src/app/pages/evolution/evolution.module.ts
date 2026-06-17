import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EvolutionPage } from './evolution.page';

const routes: Routes = [
  {
    path: '',
    component: EvolutionPage,
  },
];

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [EvolutionPage],
})
export class EvolutionPageModule {}

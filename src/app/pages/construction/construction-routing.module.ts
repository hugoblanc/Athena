import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConstructionPage } from './construction.page';

const routes: Routes = [
  {
    path: '',
    component: ConstructionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstructionPageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedPage } from './saved.page';

const routes: Routes = [
  {
    path: '',
    component: SavedPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedPageRoutingModule {}

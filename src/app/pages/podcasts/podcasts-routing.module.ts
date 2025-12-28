import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PodcastsPage } from './podcasts.page';

const routes: Routes = [
  {
    path: '',
    component: PodcastsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodcastsPageRoutingModule {}

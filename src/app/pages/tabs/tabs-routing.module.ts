import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'feed',
        loadChildren: () => import('../feed/feed.module').then(m => m.FeedPageModule)
      },
      {
        path: 'propositions',
        loadChildren: () => import('../propositions/propositions.module').then(m => m.PropositionsPageModule)
      },
      {
        path: 'construction',
        loadChildren: () => import('../construction/construction.module').then(m => m.ConstructionPageModule)
      },
      {
        path: 'informations',
        loadChildren: () => import('../informations/informations.module').then(m => m.InformationsPageModule)
      },
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

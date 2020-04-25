import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckFirstGuard } from './core/check-first.guard';
import { CurrentMetaMediaGuard } from './core/current-meta-media.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [CheckFirstGuard]
  },
  {
    path: 'media/:key',
    canActivate: [CurrentMetaMediaGuard],
    loadChildren: () => import('./media/media.module').then(m => m.MediaPageModule)
  },
  {
    path: 'media/:key/details/:id',
    canActivate: [CurrentMetaMediaGuard],
    loadChildren: () => import('./content-details/content-details.module').then(m => m.ContentDetailsPageModule)
  },
  {
    path: 'informations',
    loadChildren: () => import('./pages/informations/informations.module').then(m => m.InformationsPageModule)
  },
  {
    path: 'tuto',
    loadChildren: () => import('./pages/tuto/tuto.module').then(m => m.TutoPageModule)
  },
  {
    path: 'construction',
    loadChildren: () => import('./pages/construction/construction.module').then(m => m.ConstructionPageModule),
    canLoad: [CheckFirstGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

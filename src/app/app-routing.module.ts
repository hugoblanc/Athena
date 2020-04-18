import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CurrentMetaMediaGuard } from './core/current-meta-media.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'media/:key', canActivate: [CurrentMetaMediaGuard], loadChildren: './media/media.module#MediaPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'media/:key/details/:id', canActivate: [CurrentMetaMediaGuard], loadChildren: './content-details/content-details.module#ContentDetailsPageModule' },
  { path: 'informations', loadChildren: './informations/informations.module#InformationsPageModule' },
  { path: 'tuto', loadChildren: './home/tuto/tuto.module#TutoPageModule' },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'construction',
    loadChildren: () => import('./pages/construction/construction.module').then( m => m.ConstructionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

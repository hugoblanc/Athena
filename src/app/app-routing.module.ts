import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CurrentMetaMediaGuard } from './core/current-meta-media.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tuto', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'media/:key', canActivate: [CurrentMetaMediaGuard], loadChildren: './media/media.module#MediaPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'media/:key/details/:id', canActivate: [CurrentMetaMediaGuard], loadChildren: './content-details/content-details.module#ContentDetailsPageModule' },
  { path: 'informations', loadChildren: './informations/informations.module#InformationsPageModule' },
  { path: 'tuto', loadChildren: './home/tuto/tuto.module#TutoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

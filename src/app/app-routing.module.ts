import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'media/:id', loadChildren: './media/media.module#MediaPageModule' },
  { path: 'media/:idMedia/details/:id', loadChildren: './post-details/post-details.module#PostDetailsPageModule' },
  { path: 'informations', loadChildren: './informations/informations.module#InformationsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

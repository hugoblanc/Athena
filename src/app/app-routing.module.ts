import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckFirstGuard } from './core/check-first.guard';
import { CurrentMetaMediaGuard } from './core/current-meta-media.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'tuto',
    loadChildren: () => import('./pages/tuto/tuto.module').then(m => m.TutoPageModule)
  },
  {
    path: 'evolution',
    loadChildren: () => import('./pages/evolution/evolution.module').then(m => m.EvolutionPageModule)
  },
  {
    path: 'feed',
    loadChildren: () => import('./pages/feed/feed.module').then(m => m.FeedPageModule)
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
    path: 'proposition/:numero',
    loadChildren: () => import('./pages/proposition-detail/proposition-detail.module').then(m => m.PropositionDetailPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
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

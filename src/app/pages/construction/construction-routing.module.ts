import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConstructionPage } from './construction.page';

const routes: Routes = [
  {
    path: '',
    component: ConstructionPage
  },
  {
    path: 'issue-details/:issueNumber',
    loadChildren: () => import('./issue-details/issue-details.module').then( m => m.IssueDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstructionPageRoutingModule {}

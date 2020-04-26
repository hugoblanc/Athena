import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssueDetailsPage } from './issue-details.page';

const routes: Routes = [
  {
    path: '',
    component: IssueDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssueDetailsPageRoutingModule {}

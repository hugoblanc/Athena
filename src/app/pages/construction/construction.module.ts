import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';
import { CreateIssueComponent } from './components/create-issue/create-issue.component';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { ConstructionPageRoutingModule } from './construction-routing.module';
import { ConstructionPage } from './construction.page';
import { IssueModule } from './issue/issue.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ConstructionPageRoutingModule,
    IssueModule
  ],
  declarations: [
    ConstructionPage,
    IssuesListComponent,
    CreateIssueComponent
  ]
})
export class ConstructionPageModule {}

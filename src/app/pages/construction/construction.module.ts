import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConstructionPageRoutingModule } from './construction-routing.module';

import { ConstructionPage } from './construction.page';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { ComponentsModule } from '../../components/components.module';
import { CreateIssueComponent } from './components/create-issue/create-issue.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ConstructionPageRoutingModule
  ],
  declarations: [
    ConstructionPage,
    IssuesListComponent,
    CreateIssueComponent
  ]
})
export class ConstructionPageModule {}

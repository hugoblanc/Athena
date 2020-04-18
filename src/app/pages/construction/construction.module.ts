import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { ConstructionPageRoutingModule } from './construction-routing.module';
import { ConstructionPage } from './construction.page';
import { IssueModule } from './components/issue/issue.module';





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
    IssuesListComponent
  ]
})
export class ConstructionPageModule {}

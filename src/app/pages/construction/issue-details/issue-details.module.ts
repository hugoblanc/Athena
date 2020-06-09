import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../components/components.module';
import { IssueDetailsPageRoutingModule } from './issue-details-routing.module';
import { IssueDetailsPage } from './issue-details.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    IssueDetailsPageRoutingModule
  ],
  declarations: [IssueDetailsPage]
})
export class IssueDetailsPageModule {}

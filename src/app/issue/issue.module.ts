import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IssueModalPage } from './issue.modal';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    ComponentsModule
  ],
  entryComponents: [IssueModalPage],
  declarations: [IssueModalPage],
})
export class IssueModule { }

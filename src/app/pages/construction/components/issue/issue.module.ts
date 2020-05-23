import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../../components/components.module';
import { IssueModalPage } from './issue.modal';

/**
 * Ce module regroupe les élements qui se liée à la gestions des issues github
 *
 */
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

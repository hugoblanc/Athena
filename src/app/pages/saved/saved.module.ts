import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';
import { SavedPageRoutingModule } from './saved-routing.module';
import { SavedPage } from './saved.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SavedPageRoutingModule,
  ],
  declarations: [SavedPage],
})
export class SavedPageModule {}

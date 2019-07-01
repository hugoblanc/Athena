import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BfLoaderComponent } from './bf-loader/bf-loader.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BfLoaderComponent],
  exports: [BfLoaderComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ]
})
export class ComponentsModule { }

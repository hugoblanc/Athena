import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthLoaderComponent } from './ath-loader/ath-loader.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AthLoaderComponent],
  exports: [AthLoaderComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ]
})
export class ComponentsModule { }

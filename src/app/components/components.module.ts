import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthLoaderComponent } from './ath-loader/ath-loader.component';
import { IonicModule } from '@ionic/angular';
import { AthHeaderComponent } from './ath-header/ath-header.component';

@NgModule({
  declarations: [AthLoaderComponent, AthHeaderComponent],
  exports: [AthLoaderComponent, AthHeaderComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ]
})
export class ComponentsModule { }

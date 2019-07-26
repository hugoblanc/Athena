import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthLoaderComponent } from './ath-loader/ath-loader.component';
import { IonicModule } from '@ionic/angular';
import { HorizontalComponent } from './horizontal/horizontal.component';

@NgModule({
  declarations: [AthLoaderComponent, HorizontalComponent],
  exports: [AthLoaderComponent, HorizontalComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ]
})
export class ComponentsModule { }

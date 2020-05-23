import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DblclickDirective } from './dblclick.directive';



@NgModule({
  declarations: [DblclickDirective],
  imports: [
    CommonModule
  ],
  exports: [DblclickDirective],
})
export class DirectivesModule { }

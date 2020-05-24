import { ElementRef } from '@angular/core';
import { DblclickDirective } from './dblclick.directive';
import { GestureController } from '@ionic/angular';

describe('DblclickDirective', () => {


  it('should create an instance', () => {

    const el = new ElementRef({});
    const gestCtrl: any = {create: () => ({enable: () => {}})};
    const directive = new DblclickDirective(el, gestCtrl);
    expect(directive).toBeTruthy();
  });
});

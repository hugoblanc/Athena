import { ElementRef } from '@angular/core';
import { DblclickDirective } from './dblclick.directive';

describe('DblclickDirective', () => {


  it('should create an instance', () => {

    const el = new ElementRef({});
    const gestCtrl: any = {};
    const directive = new DblclickDirective(el, gestCtrl);
    expect(directive).toBeTruthy();
  });
});

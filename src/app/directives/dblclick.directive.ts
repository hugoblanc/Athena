import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { GestureController } from '@ionic/angular';

@Directive({
  selector: '[athDblclick]'
})
export class DblclickDirective {

  private lastOnStart = 0;
  private DOUBLE_CLICK_THRESHOLD = 400;

  @Output() athDblclick = new EventEmitter();


  constructor(private el: ElementRef , private gestureCtrl: GestureController) {
    const gesture = this.gestureCtrl.create({
      gestureName: 'dblick',
      el: this.el.nativeElement,
      threshold: 0,
      onStart: () => { this.onStart(); }
    });

    gesture.enable();

  }




  ngOnInit() {
  }

  private onStart() {
    const now = Date.now();

    if (Math.abs(now - this.lastOnStart) <= this.DOUBLE_CLICK_THRESHOLD) {
      this.athDblclick.emit();
      this.lastOnStart = 0;
    } else {
      this.lastOnStart = now;
    }
  }

}

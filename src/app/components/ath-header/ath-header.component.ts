import { Component, OnInit, AfterViewInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { StyleService } from '../../provider/style.service';

@Component({
  selector: 'ath-header',
  templateUrl: './ath-header.component.html',
  styleUrls: ['./ath-header.component.scss'],
})
export class AthHeaderComponent implements OnInit, AfterViewInit {

  @Input() title?: string;
  @Input() help?: string;
  @Input() callOption?: Function;
  @Input() scrollArea?: any;
  // tslint:disable-next-line: variable-name
  _pureHeader: boolean; // Seulement les boutton ou pas


  @Input()
  set pureHeader(val: boolean) {
    this._pureHeader = val;
    this.dealWithPureHeader();
  }




  newHeaderHeight: any;
  dynamic = '';
  shadowIsDisplayed = false;
  classOverride = '';
  constructor(public style: StyleService,
              public element: ElementRef,
              public renderer: Renderer2) {
    console.log(element);
  }

  ngOnInit() {
    this.dealWithPureHeader();
  }




  ngAfterViewInit() {
    if (this.scrollArea != null && this._pureHeader !== true) {
      this.scrollArea.ionScroll.subscribe((ev) => {
        this.resizeHeader(ev);
      });
    } else if (this.scrollArea === undefined && this._pureHeader === undefined) {
      this.renderer.addClass(this.element.nativeElement, 'image-is-missing');
      this.renderer.removeClass(this.element.nativeElement, 'image-is-present');
    }
  }

  resizeHeader(ev) {


    const shadows = document.querySelectorAll('#shad');
    if (this.shadowIsDisplayed === false && ev.detail.scrollTop > 67) {
      this.renderer.setStyle(shadows[shadows.length - 1], 'height', '5%');
      this.shadowIsDisplayed = true;
    } else if (this.shadowIsDisplayed === true && ev.detail.scrollTop <= 67) {
      this.shadowIsDisplayed = false;
      this.renderer.setStyle(shadows[shadows.length - 1], 'height', '0%');
    }


  }


  private dealWithPureHeader() {
    if (this._pureHeader === true) {
      const shadows = document.querySelectorAll('#ath-header');
      this.renderer.addClass(shadows[shadows.length - 1], 'pure-ath-header');
      this.renderer.addClass(this.element.nativeElement, 'image-is-present');
      this.renderer.removeClass(this.element.nativeElement, 'image-is-missing');
      this.classOverride = 'pureHeader';
    } else if (this._pureHeader === false) {
      this.renderer.addClass(this.element.nativeElement, 'image-is-missing');
      this.renderer.removeClass(this.element.nativeElement, 'image-is-present');
    }
  }
}


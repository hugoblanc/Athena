import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  ionBackgroundColor!: string;
  ionTextColor!: string;

  public isLight = false;
  constructor() {
    const themeWrapper = document.querySelector('body');
    if (themeWrapper) {
      this.ionBackgroundColor = themeWrapper?.style.getPropertyValue('--ion-background-color');
      this.ionTextColor = themeWrapper?.style.getPropertyValue('--ion-text-color');
    }
  }


  public initPage() {
    if (!this.isLight) {
      this.setDark();
    } else {
      this.setLight();
    }
  }

  public leavePage() {
    this.setDark();
  }

  public switchNightMode() {
    if (this.isLight) {
      this.setDarkAndChangeInd();
    } else {
      this.setLightAndChangeInd();
    }
  }

  private setDarkAndChangeInd() {
    this.isLight = false;
    this.setDark();
  }
  private setLightAndChangeInd() {
    this.isLight = true;
    this.setLight();
  }

  private setDark() {
    const themeWrapper = document.querySelector('body');
    themeWrapper?.style.setProperty('--ion-background-color', this.ionBackgroundColor);
    themeWrapper?.style.setProperty('--ion-text-color', this.ionTextColor);
    themeWrapper?.style.setProperty('--color', this.ionTextColor);
  }
  private setLight() {
    const themeWrapper = document.querySelector('body');
    themeWrapper?.style.setProperty('--ion-background-color', '#FFFFFF');
    themeWrapper?.style.setProperty('--ion-text-color', '#000000');
    themeWrapper?.style.setProperty('--color', '#000000');
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor() { }

  setPrimaryColor(hexCode: string) {
    const themeWrapper = document.querySelector('body');
    themeWrapper.style.setProperty('--primaryColor', '#000000');
  }
}

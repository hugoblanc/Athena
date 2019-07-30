import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor() { }

  // ** Pas utilisé pour l'instant
  setPrimaryColor() {
    const themeWrapper = document.querySelector('body');
    themeWrapper.style.setProperty('--primaryColor', '#000000');
  }
}

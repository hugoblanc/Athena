import { Injectable } from '@angular/core';

/**
 * Gère le mode lecture clair/sombre des articles (bouton lune).
 *
 * On bascule un attribut `data-reading="light"` sur <body> : le CSS surcharge
 * alors toute la palette Signal (tokens --ath-*) avec les valeurs claires (cf.
 * global.scss). Ainsi fond, surfaces, texte, chips… passent tous en clair d'un
 * coup, au lieu de bricoler quelques variables Ionic à la main.
 *
 * Le mode est scopé à la lecture : `initPage()` l'applique en entrant sur un
 * article, `leavePage()` le retire en sortant. La préférence (`isLight`)
 * persiste d'un article à l'autre.
 */
@Injectable({
  providedIn: 'root'
})
export class StyleService {

  public isLight = false;

  public initPage(): void {
    this.apply();
  }

  public leavePage(): void {
    document.body.removeAttribute('data-reading');
  }

  public switchNightMode(): void {
    this.isLight = !this.isLight;
    this.apply();
  }

  private apply(): void {
    if (this.isLight) {
      document.body.setAttribute('data-reading', 'light');
    } else {
      document.body.removeAttribute('data-reading');
    }
  }
}

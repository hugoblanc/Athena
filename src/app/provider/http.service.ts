import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  private develop: boolean; // L'indicateur de plateforme web ou native

  constructor(private platform: Platform, public nativeHttp: HTTP, public developHttp: HttpClient) {
    this.develop = !platform.is('cordova');
  }

  /**
   * Cette methode se charge d'appeler le bon service pour faire les requete
   * Sur mobile on doit utiliser un appel natif car le cors nous bloque sur Wordpress API
   * @param url l'url a get
   */
  get(url: string): Observable<any> {
    let get$;
    if (this.develop) {
      get$ = this.developGet(url);
    } else {
      get$ = this.nativeGet(url);
    }
    return get$;
  }


  /**
   * La methode qui get en natif
   * @param url L'url a get
   */
  private nativeGet(url: string) {
    return from(this.nativeHttp.get(url, {}, {}))
      .pipe(map((data: HTTPResponse) => JSON.parse(data.data)));
  }

  /**
   * La methode qui call en broswer
   * @param url l'url a get
   */
  private developGet(url: string) {
    return this.developHttp.get(url);
  }
}

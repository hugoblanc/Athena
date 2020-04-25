import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
   * @param ignoreCors paramètre optionel qui indique si on doit utiliser le plugin natif pour ignorer le cors sur IOS
   */
  get(url: string, ignoreCors?: boolean): Observable<any> {
    let get$;
    if (this.develop || !ignoreCors) {
      get$ = this.developGet(url);
    } else {
      get$ = this.nativeGet(url);
    }
    return get$;
  }


  post(url: string, body?: any, ignoreCors?: boolean): Observable<any> {
    let post$;
    if (this.develop || !ignoreCors) {
      post$ = this.developPost(url, body);
    } else {
      post$ = this.nativePost(url, body);
    }
    return post$;
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
    return this.developHttp.get(url, );
  }

  /**
   * La methode qui post en natif
   * @param url L'url a post
   * @param body le body a poster
   */
  private nativePost(url: string, body?: any) {

    return from(this.nativeHttp.post(url, body, {}))
      .pipe(map((data: HTTPResponse) => JSON.parse(data.data)));
  }
  /**
   * La methode qui call en broswer
   * @param url l'url a get
   * @param body le body a poster
   */
  private developPost(url: string, body?: any) {
    return this.developHttp.post(url, body);
  }


}

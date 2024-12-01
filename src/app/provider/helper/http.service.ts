import { HttpClient } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { HTTP, HTTPResponse } from "@ionic-native/http/ngx";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { runInZone } from "../../utils/run-in-zone.operator";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private develop: boolean; // L'indicateur de plateforme web ou native

  constructor(
    private readonly nativeHttp: HTTP,
    private readonly developHttp: HttpClient,
    private readonly zone: NgZone
  ) {
    this.develop = !Capacitor.isNativePlatform();
  }

  /**
   * Cette methode se charge d'appeler le bon service pour faire les requete
   * Sur mobile on doit utiliser un appel natif car le cors nous bloque sur Wordpress API
   * @param url l'url a get
   * @param ignoreCors paramètre optionel qui indique si on doit utiliser le plugin natif pour ignorer le cors sur IOS
   */
  get<T>(url: string, ignoreCors?: boolean): Observable<T> {
    let get$;
    if (this.develop || !ignoreCors) {
      get$ = this.developGet(url);
    } else {
      get$ = this.nativeGet(url);
    }
    console.warn("Ready to calll ", url);
    return get$;
  }

  post<T>(url: string, body?: any, ignoreCors?: boolean): Observable<T> {
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
    const headers: any = {
      "Content-Type": "application/json",
    };
    headers["Accept"] = "application/json";
    return from(this.nativeHttp.get(url, {}, headers)).pipe(
      runInZone(this.zone),
      map((data: HTTPResponse) => {
        return JSON.parse(data.data);
      })
    );
  }
  /**
   * La methode qui call en broswer
   * @param url l'url a get
   */
  private developGet(url: string) {
    return this.developHttp.get(url);
  }

  /**
   * La methode qui post en natif
   * @param url L'url a post
   * @param body le body a poster
   */
  private nativePost(url: string, body?: any) {
    return from(this.nativeHttp.post(url, body, {})).pipe(
      runInZone(this.zone),
      map((data: HTTPResponse) => JSON.parse(data.data))
    );
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

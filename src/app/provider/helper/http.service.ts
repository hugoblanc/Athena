import { HttpClient } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { HTTP, HTTPResponse } from "@ionic-native/http/ngx";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { runInZone } from "../../utils/run-in-zone.operator";
import { FirebaseAuthService } from "../auth/firebase-auth.service";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private develop: boolean; // L'indicateur de plateforme web ou native

  constructor(
    private readonly nativeHttp: HTTP,
    private readonly developHttp: HttpClient,
    private readonly zone: NgZone,
    private readonly authService: FirebaseAuthService
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

  post<T>(url: string, body?: any, ignoreCors?: boolean, customHeaders?: Record<string, string>): Observable<T> {
    let post$;
    if (this.develop || !ignoreCors) {
      post$ = this.developPost(url, body, customHeaders);
    } else {
      post$ = this.nativePost(url, body, customHeaders);
    }
    return post$;
  }

  delete<T>(url: string, ignoreCors?: boolean, customHeaders?: Record<string, string>): Observable<T> {
    let delete$;
    if (this.develop || !ignoreCors) {
      delete$ = this.developDelete(url, customHeaders);
    } else {
      delete$ = this.nativeDelete(url, customHeaders);
    }
    return delete$;
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

    // Ajouter le token d'authentification si disponible
    const token = this.authService.getCachedToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

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
   * @param customHeaders entêtes additionnels (ex: X-Anon-Key)
   */
  private nativePost(url: string, body?: any, customHeaders?: Record<string, string>) {
    const headers = this.buildNativeHeaders(customHeaders);

    return from(this.nativeHttp.post(url, body, headers)).pipe(
      runInZone(this.zone),
      map((data: HTTPResponse) => JSON.parse(data.data))
    );
  }
  /**
   * La methode qui call en broswer
   * @param url l'url a get
   * @param body le body a poster
   * @param customHeaders entêtes additionnels (ex: X-Anon-Key)
   */
  private developPost(url: string, body?: any, customHeaders?: Record<string, string>) {
    return this.developHttp.post(url, body, customHeaders ? { headers: customHeaders } : {});
  }

  /**
   * La methode qui delete en natif
   * @param url L'url a delete
   * @param customHeaders entêtes additionnels (ex: X-Anon-Key)
   */
  private nativeDelete(url: string, customHeaders?: Record<string, string>) {
    const headers = this.buildNativeHeaders(customHeaders);

    return from(this.nativeHttp.delete(url, {}, headers)).pipe(
      runInZone(this.zone),
      map((data: HTTPResponse) => JSON.parse(data.data || 'null'))
    );
  }
  /**
   * La methode qui delete en browser
   * @param url l'url a delete
   * @param customHeaders entêtes additionnels (ex: X-Anon-Key)
   */
  private developDelete(url: string, customHeaders?: Record<string, string>) {
    return this.developHttp.delete(url, customHeaders ? { headers: customHeaders } : {});
  }

  /**
   * Construit les entêtes pour les appels natifs : JSON + Bearer Firebase si
   * disponible + entêtes additionnels éventuels.
   */
  private buildNativeHeaders(customHeaders?: Record<string, string>): any {
    const headers: any = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };

    const token = this.authService.getCachedToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (customHeaders) {
      Object.assign(headers, customHeaders);
    }

    return headers;
  }
}

import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }


  /**
   * Cette methode se charge de save l'objet dans le storage
   * @param key La clé de l'objet
   * @param value La valeur string ou json a poster
   */
  public set(key: string, value: any) {
    if (!(typeof value === 'string')) {
      value = JSON.stringify(value);
    }
    this.storage.setItem(key, value);
  }

  /**
   * Cette emtode se charge de récupérer un objet en local storage et de le parser
   * @param key La clé a récupérer dans le localstorage
   */
  public get<T>(key: string): Observable<T> {
    return from(this.storage.getItem(key))
      .pipe(map((data: string) => {
        return JSON.parse(data);
      }));
  }

}

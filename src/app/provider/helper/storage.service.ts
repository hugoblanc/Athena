import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public static COUNT_KEY = 'COUNT_KEY';
  public static INSTALLATION_DATE = 'INSTALLATION_DATE';
  public static DISPLAY_TUTO = 'DISPLAY_TUTO';
  private static FIRST_LAUNCH = 'FIRST_LAUNCH';


  constructor(private storage: Storage) { }



  initFirstLaunch(): void {
    this.set(StorageService.FIRST_LAUNCH, true);
  }


  isFirstLaunch(): Observable<boolean> {
    return this.get(StorageService.FIRST_LAUNCH)
               .pipe(map((isFirst) => (isFirst == null)));
  }

  /**
   * Cette methode se charge de changer une propriété d'objet en storage:  key.objectKey = value
   * @param key le nom en storage de l'objet
   * @param objectKey La clé de la propriété de l'objet
   * @param value la valeur que l'on veut doner à l'objet
   */
  public editObject(key: string, objectKey: string, value: any): Observable<any> {
    return this.get<any>(key).pipe(tap((object: any) => {
      if (object == null) {
        object = {};
      }
      object[objectKey] = value;
      this.set(key, object);
    }));
  }

  /**
   * Cette methode ajoute un element dans un tableau contenu dans le storage
   * @param key la clé qui définie le tableau dans le localstorage
   * @param value la valeur a inserrer au tableau
   */
  public addToArray(key: string, value: any): Observable<any> {
    return this.get<any[]>(key).pipe(tap((array: any[]) => {
      if (array == null) {
        array = [];
      }
      if (!Array.isArray(array)) {
        throw new Error('l\'objet n\'est pas un tableau ');
      }
      array.push(value);
      this.set(key, array);
    }));
  }


  /**
   * Cette methode se charge de save l'objet dans le storage
   * @param key La clé de l'objet
   * @param value La valeur string ou json a poster
   */
  public set(key: string, value: any) {
    if (!(typeof value === 'string')) {
      value = JSON.stringify(value);
    }
    this.storage.set(key, value);
  }

  /**
   * Cette emtode se charge de récupérer un objet en local storage et de le parser
   * @param key La clé a récupérer dans le localstorage
   */
  public get<T>(key: string): Observable<T> {
    return from(this.storage.get(key))
      .pipe(map((data: string) => {
        return JSON.parse(data || 'null');
      }));
  }


}

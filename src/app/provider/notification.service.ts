import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { tap, flatMap, map, filter } from 'rxjs/operators';
import { concat, Observable, from } from 'rxjs';
import { MediasService } from '../medias.service';
import { MetaMedia } from '../models/meta-media';
import { FirebaseLib } from '@ionic-native/firebase-lib/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // Storage Key
  private static UNSUBSCRIBED_NOTIFICATION = 'UNSUBSCRIBED_NOTIFICATION';
  private static SUBSCRIBED_NOTIFICATION = 'SUBSCRIBED_NOTIFICATION';

  // Le sujet auquel l'utilisateur est abonné
  private subscribedTopics: string[] = [];

  // Le sujet auquel l'utilisateur est désabonné
  private unsubscribedTopics: string[] = [];

  constructor(
    private ss: StorageService,
    private mediaService: MediasService,
    private firebaseLib: FirebaseLib) {

  }

  public init(): Observable<any[]> {
    // Récupération des données en locastorage
    const makeDiff$ = this.getLocal()
      // On fait la différence entre les données du localstorage et les media récupéré
      .pipe(map((result) => this.makeDiffWithMedia()),
        // on convertis la liste de metamedia en liste de string classique
        map((diff: MetaMedia[]) => this.convertMetaMediaToTopics(diff)),
        // Si on a 0 diff on s'arrète la
        filter((diff) => (diff.length > 0)),
        // Si on a des diff, alors on subscribe atout les topics
        flatMap((diff) => this.subscribeAll(diff)));

    return makeDiff$;
  }



  private getLocal(): Observable<any> {
    // Ici on prépare 2 observable pour récupérer les données en local storage
    const unsub$ = this.ss.get<string[]>(NotificationService.UNSUBSCRIBED_NOTIFICATION)
      .pipe(tap((storageTopics) => this.unsubscribedTopics = storageTopics || []));
    const sub$ = this.ss.get<string[]>(NotificationService.SUBSCRIBED_NOTIFICATION)
      .pipe(tap((storageTopics) => this.subscribedTopics = storageTopics || []));

    // Finalement on execute les deux a la suite
    return concat(sub$, unsub$);
  }


  /**
   * La methode qui fait la différence entre les data local et les média du media service
   */
  private makeDiffWithMedia(): MetaMedia[] {
    // Ici on cherche a voir si des medias sont présent mais pas géré en terme de notification
    // En d'autre terme, si un nouveau media est créé on doit ajouter le topic pour le user
    const diff = this.mediaService.medias.filter((metaMedia: MetaMedia) => {
      return !(this.subscribedTopics.includes(metaMedia.key) || this.unsubscribedTopics.includes(metaMedia.key));
    });

    return diff;
  }

  private convertMetaMediaToTopics(metaMedias: MetaMedia[]): string[] {
    this.checkNullOrEmpty(metaMedias);
    return metaMedias.map((metaMedia) => metaMedia.key);
  }


  private subscribeAll(topics: string[]): Observable<any[]> {
    this.checkNullOrEmpty(topics);
    const subAll$ = topics.map((topic) => this.subscribe(topic));
    return concat(...subAll$);
  }
  private unsubscribeAll(topics: string[]): Observable<any[]> {
    const unsubAll$ = topics.map((topic) => this.unsubscribe(topic));
    return concat(...unsubAll$);
  }


  private subscribe(topic: string): Observable<any> {
    return from(this.firebaseLib.subscribe(topic))
      .pipe(flatMap(() => this.ss.addToArray(NotificationService.SUBSCRIBED_NOTIFICATION, topic)));
  }
  private unsubscribe(topic: string): Observable<any> {
    return from(this.firebaseLib.unsubscribe(topic))
      .pipe(flatMap(() => this.ss.addToArray(NotificationService.UNSUBSCRIBED_NOTIFICATION, topic)));
  }


  /**
   * Cette methode vérifie l'état de l'objet (non null et non vide si tableau)
   * @param object l'object a vérifier
   */
  private checkNullOrEmpty(object: any) {
    if (object == null) {
      throw new Error('L\'objet est null');
    }

    // if (Array.isArray(object) && object.length === 0) {
    //   throw new Error('Le tableau est vide');
    // }
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { concat, from, Observable } from 'rxjs';
import { filter, flatMap, map, tap } from 'rxjs/operators';
import { MetaMedia } from '../models/meta-media/meta-media';
import { StorageService } from './helper/storage.service';
import { MetaMediaService } from './meta-media/meta-media.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // Storage Key
  private static NOTIFICATIONS_TOPICS = 'NOTIFICATIONS_TOPICS';

  // Le sujet auquel l'utilisateur est abonné/désabonné
  private notificationTopics: any = {};

  constructor(
    private ss: StorageService,
    private metaMediaService: MetaMediaService,
    private firebaseX: FirebaseX,
    private router: Router) {

  }


  /**
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   * * -------------------------------------------  PUBLIC METHODE  ----------------------------------------
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */

  /**
   * Initialisation de l'action a effectuer à l'ouverture d'une notification
   */
  public initOpenNotification(): void {
    this.firebaseX.onMessageReceived()
      .subscribe((notification) => {
        console.log(notification);
        if (notification.tap) {
          this.router.navigateByUrl(`/media/${notification.key}/details/${notification.id}`);
        }
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * Initialisation des données du service
   */
  public initData(): Observable<any[]> {
    // Récupération des données en locastorage
    const makeDiff$ = this.getLocal()
      // On fait la différence entre les données du localstorage et les media récupéré
      .pipe(map((result) => this.makeDiffWithMedia()),
        // on convertis la liste de metamedia en liste de string classique
        map((diff: MetaMedia[]) => this.convertMetaMediaToTopics(diff)),
        // On met a jour les indicateur des media
        tap(() => this.updateMediaNotificationIndicator()),
        // Si on a 0 diff on s'arrète la
        filter((diff) => (diff.length > 0)),
        // Si on a des diff, alors on subscribe atout les topics
        flatMap((diff) => this.subscribeAll(diff)));


    this.firebaseX.subscribe('test').then(() => {

    });

    return makeDiff$;
  }


  public switchNotifSetting(topic: string, newIndicator: boolean): Observable<any> {
    let switch$;
    if (newIndicator) {
      switch$ = this.subscribe(topic);
    } else {
      switch$ = this.unsubscribe(topic);
    }
    return switch$;
  }


  /**
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   * * -------------------------------------------  PRIVATE METHODE  ----------------------------------------
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */

  private getLocal(): Observable<any> {
    // Préparation de l'observable qui va stocker les objet sous la forme key/value avec value boolean true/false pour activé/désactivé
    const notifTopics$ = this.ss.get<any>(NotificationService.NOTIFICATIONS_TOPICS)
      .pipe(tap((notifTopics) => this.notificationTopics = notifTopics || {}));



    // Finalement on execute les deux a la suite
    return notifTopics$;
  }

  /**
   * La methode qui fait la différence entre les data local et les média du media service
   */
  private makeDiffWithMedia(): MetaMedia[] {
    const result = [];
    // Ici on cherche a voir si des medias sont présent mais pas géré en terme de notification
    // En d'autre terme, si un nouveau media est créé on doit ajouter le topic pour le user
    for (const listMedia of this.metaMediaService.listMetaMedia) {

      const diff = listMedia.metaMedias.filter((metaMedia: MetaMedia) => {
        // Si c'est null ça veut dire qu'on a pas de trace de ce meta media dans le locastroage
        // On doit donc l'ajouter
        return this.notificationTopics[metaMedia.key] == null;
      });
      result.concat(diff);
    }

    return result;
  }

  private convertMetaMediaToTopics(metaMedias: MetaMedia[]): string[] {
    this.checkNullOrEmpty(metaMedias);
    return metaMedias.map((metaMedia) => metaMedia.key);
  }

  private updateMediaNotificationIndicator(): void {
    for (const topic in this.notificationTopics) {
      if (this.notificationTopics.hasOwnProperty(topic)) {
        this.genericMetaMediaIndSetter(this.notificationTopics[topic], topic);
      }
    }
  }

  private genericMetaMediaIndSetter(status: boolean, topic: string) {
    const metaMedia = this.metaMediaService.findAndSetMediaByKey(topic);
    metaMedia.notification = status;
  }




  /**
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   * * -------------------------------------------  FIREBASE PART  ----------------------------------------
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */

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
    return from(this.firebaseX.subscribe(topic))
      .pipe(
        tap(() => this.notificationTopics[topic] = true),
        tap(() => this.genericMetaMediaIndSetter(true, topic)),
        flatMap(() => this.ss.editObject(NotificationService.NOTIFICATIONS_TOPICS, topic, true)));
  }
  private unsubscribe(topic: string): Observable<any> {
    return from(this.firebaseX.unsubscribe(topic))
      .pipe(
        tap(() => this.notificationTopics[topic] = false),
        tap(() => this.genericMetaMediaIndSetter(false, topic)),
        flatMap(() => this.ss.editObject(NotificationService.NOTIFICATIONS_TOPICS, topic, false)));
  }



  /**
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   * * -------------------------------------------  ERROR HANDLING  ----------------------------------------
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */

  /**
   * Cette methode vérifie l'état de l'objet (non null et non vide si tableau)
   * @param object l'object a vérifier
   */
  private checkNullOrEmpty(object: any) {
    if (object == null) {
      throw new Error('L\'objet est null');
    }
  }

}

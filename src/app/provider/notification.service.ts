import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { concat, Observable, of } from "rxjs";
import { flatMap, tap } from "rxjs/operators";
import { ICategories } from "../models/categories/icategories";
import { MetaMedia } from "../models/meta-media/meta-media";
import { StorageService } from "./helper/storage.service";
import { MetaMediaService } from "./meta-media/meta-media.service";

/**
 * *~~~~~~~~~~~~~~~~~~~
 * Author: HugoBlanc |
 * *~~~~~~~~~~~~~~~~~~~
 * Ce service est charge de la partie des notifications pour l'appliction mobile athena
 * Il a plusieurs responsabilité
 * - Il doit gérer correctement les ouvertures de notification (action au clique sur la notif => redirection vers page)
 * - Il doit subscribe ou unsubscribe les topics auquel l'utilisateur est abonnées
 * https://firebase.google.com/docs/cloud-messaging/android/topic-messaging
 * - Il doit aussi garder une trace de ces modificaiton en local storage afin de pouvoir afficher
 * à l'utilisateur sa configuration actuelle
 * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
@Injectable({
  providedIn: "root",
})
export class NotificationService {
  // TODO: CLeaner ce service qui est complètement parti en live
  // TODO :Implementer un mécanisme qui permettrait de subscribe a tout ce qui doit l'etre (local storage) au démarrage

  // Storage Key
  private static NOTIFICATIONS_TOPICS = "NOTIFICATIONS_TOPICS";
  private static NOTIFICATIONS_TOPICS_CATEGORIES =
    "NOTIFICATIONS_TOPICS_CATEGORIES";

  // Le sujet auquel l'utilisateur est abonné/désabonné
  private notificationTopics: any = {};

  // Les categories des média auquel l'utilisateur est désabonné
  private notificationTopicsCategories: any = {};

  constructor(
    private ss: StorageService,
    private metaMediaService: MetaMediaService,
    // private firebaseX: FirebaseX,
    private router: Router
  ) {
    // Au démarrage on récupère les catégorie que l'utilisateur a expressement désactivé
    const notifTopics$ = this.ss.get<any[]>(
      NotificationService.NOTIFICATIONS_TOPICS_CATEGORIES
    );

    // On les assigne a notre variable global
    notifTopics$.subscribe((notificationTopicCategories) => {
      this.notificationTopicsCategories = notificationTopicCategories || {};
    });
  }

  /**
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   * * -------------------------------------------  PUBLIC METHODE  ----------------------------------------
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */

  /**
   * Cette methode permet de configurer les action a effectuer lors du clique sur une notifications
   * L'action a executer est la navigation vers la page en question avec les bon paramètre (id post wordpress ou youtube)
   */
  public initOpenNotification(): void {
    // this.firebaseX.getToken().then((token: string) => {
    //   console.log(token);
    // });

    // this.firebaseX.onMessageReceived().subscribe(
    //   (notification) => {
    //     console.log(notification);
    //     if (notification.tap) {
    //       this.router.navigateByUrl(
    //         `/media/${notification.key}/details/${notification.id}`
    //       );
    //     }
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
  }

  public initData(): Observable<any[]> {
    return of([1]);
    // const grantPermission$ = from(this.firebaseX.grantPermission());
    // const makeDiff$ = grantPermission$.pipe(
    //   // Vérif permission (IOS only)
    //   filter((permission: boolean) => permission),
    //   // Récupération des données en locastorage
    //   flatMap(() => this.getLocal()),
    //   // On fait la différence entre les données du localstorage et les media récupéré
    //   map((result) => this.makeDiffWithMedia()),
    //   // on convertis la liste de metamedia en liste de string classique
    //   map((diff: MetaMedia[]) => this.convertMetaMediaToTopics(diff)),
    //   // On met a jour les indicateur des media
    //   tap(() => this.updateMediaNotificationIndicator()),
    //   // Si on a 0 diff on s'arrète la
    //   filter((diff) => diff.length > 0),
    //   // Si on a des diff, alors on subscribe atout les topics
    //   flatMap((diff) => this.subscribeAllMetaMedia(diff))
    // );

    // return makeDiff$;
  }

  public isCategoryActivated(key: string, id: number) {
    const unsubCategories = this.notificationTopicsCategories[key];
    if (!unsubCategories || unsubCategories.length === 0) {
      return true;
    }

    if (!unsubCategories.find((idLocal) => id === idLocal)) {
      return true;
    }

    return false;
  }

  /**
   * Le monstre du loch ness
   * Quand j'ai écris ce code seul dieux et moi savions ce qu'il faisait (vendredi soir 20:15 ...)
   * SI je ne rattrape pas le tire rapidement seul dieux saura ce qu'il fait !
   */
  public dealWithUserChoice(
    metaMedia: MetaMedia,
    choices: any[],
    categories: ICategories[]
  ): Observable<any[]> {
    // MEta media part
    const isMetaMediaActivated = choices[0] === "all";
    if (isMetaMediaActivated !== metaMedia.notification) {
      this.switchMetaMediaNotifSetting(
        metaMedia.key,
        isMetaMediaActivated
      ).subscribe(() => {
        console.log("Done");
        // TODO: Rendre ce truc asynchrone et cleaner cette merde
      });
    }

    // Récupération des topic en localstorage
    const storedTopic: number[] =
      this.notificationTopicsCategories[metaMedia.key] || [];

    // Ici on vérifie s'il n'y a pas de topic categorie qui sont en localstorage mais pas dans les categorie fraichement récupéré
    // Risque de perte de controle sinon
    const idToUnsub = storedTopic.filter(
      (id) => categories.findIndex((cat) => cat.id === id) !== -1
    );

    const topicToUnsubscribe = [];
    // On itère sur tout les id présent dans la liste de choix
    for (const val of choices) {
      if (val !== "all") {
        // On supprime du tableau de categories l'ensemble des choix actif du user
        const indexToDelete = categories.findIndex((cat) => val === cat.id);
        categories.splice(indexToDelete, 1);

        // En parrèlele on construit le tableau d'élément coché par l'utilisateur
        // c-a-d les élements a unsubscribe
        topicToUnsubscribe.push(val);
      }
    }
    // categories contient maintenant uniquement les catgorie qui on été décoché par l'utilisateur
    const topicToSubscribe = categories.map((cat) => cat.id);
    topicToUnsubscribe.concat(idToUnsub);

    console.log(topicToUnsubscribe);
    console.log(topicToSubscribe);

    const allOperation$ = concat(
      this.unsubscribeAllTopic(
        topicToUnsubscribe.map((id) =>
          this.constructTopicForMetaKeyAndCategoryId(metaMedia.key, id)
        )
      ),
      this.subscribeAllTopic(
        topicToSubscribe.map((id) =>
          this.constructTopicForMetaKeyAndCategoryId(metaMedia.key, id)
        )
      )
    );

    return allOperation$.pipe(
      tap(() => {
        this.notificationTopicsCategories[metaMedia.key] = topicToSubscribe;
        this.ss.set(
          NotificationService.NOTIFICATIONS_TOPICS_CATEGORIES,
          this.notificationTopicsCategories
        );
      })
    );
  }

  /**
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   * * -------------------------------------------  PRIVATE METHODE  ----------------------------------------
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */

  /**
   * Cette methode permet de switcher les notification global d'un média
   * @param mediaKey la clé d'un media dont on veut switcher l'état
   * @param newIndicator le nouvel état
   */
  private switchMetaMediaNotifSetting(
    mediaKey: string,
    newIndicator: boolean
  ): Observable<any> {
    let switch$;
    if (newIndicator) {
      switch$ = this.subscribeMEtaMedia(mediaKey);
    } else {
      switch$ = this.unsubscribeMetaMedia(mediaKey);
    }
    return switch$;
  }

  private getLocal(): Observable<any> {
    // Préparation de l'observable qui va stocker les objet sous la forme key/value avec value boolean true/false pour activé/désactivé
    const notifTopics$ = this.ss
      .get<any>(NotificationService.NOTIFICATIONS_TOPICS)
      .pipe(
        tap((notifTopics) => (this.notificationTopics = notifTopics || {}))
      );
    return notifTopics$;
  }

  /**
   * La methode qui fait la différence entre les data local et les média du media service
   */
  private makeDiffWithMedia(): MetaMedia[] {
    let result = [];
    // Ici on cherche a voir si des medias sont présent mais pas géré en terme de notification
    // En d'autre terme, si un nouveau media est créé on doit ajouter le topic pour le user
    for (const listMedia of this.metaMediaService.listMetaMedia) {
      const diff = listMedia.metaMedias.filter((metaMedia: MetaMedia) => {
        // Si c'est null ça veut dire qu'on a pas de trace de ce meta media dans le locastroage
        // On doit donc l'ajouter
        return this.notificationTopics[metaMedia.key] == null;
      });
      result = result.concat(diff);
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
    if (status == null) {
      status = true;
    }
    if (metaMedia) {
      metaMedia.notification = status;
    }
  }

  /**
   * Cette methode construit les clé correspondant au topic des categories
   * ! que l'utilisateur ne souhaite pas recevoir
   */
  private constructTopicForMetaKeyAndCategoryId(key: string, id: number) {
    return key + "-" + id;
  }

  /**
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   * * -------------------------------------------  FIREBASE PART  ----------------------------------------
   * Ici on gère la subscription et unsubscription aux topic.
   * Dans le cas des meta media on fait des traitement supplmentaire
   * - mettre a jour l'indicateur du metaMedia
   * - Mettre a jour le localstorage
   * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */

  // ** SUB/UNSUB - MetaMedia -  Part

  private subscribeAllMetaMedia(topics: string[]): Observable<any[]> {
    this.checkNullOrEmpty(topics);
    const subAll$ = topics.map((topic) => this.subscribeMEtaMedia(topic));
    return concat(...subAll$);
  }

  // Si jamais un jour on veut faire une options pour couper toutes les notifications
  // private unsubscribeAllMetaMedia(topics: string[]): Observable<any[]> {
  //   const unsubAll$ = topics.map((topic) => this.unsubscribeMetaMedia(topic));
  //   return concat(...unsubAll$);
  // }

  private subscribeMEtaMedia(topic: string): Observable<any> {
    return this.subscribeTopic(topic).pipe(
      tap(() => (this.notificationTopics[topic] = true)),
      tap(() => this.genericMetaMediaIndSetter(true, topic)),
      flatMap(() =>
        this.ss.editObject(
          NotificationService.NOTIFICATIONS_TOPICS,
          topic,
          true
        )
      )
    );
  }
  private unsubscribeMetaMedia(topic: string): Observable<any> {
    return this.unsubscribeTopic(topic).pipe(
      tap(() => (this.notificationTopics[topic] = false)),
      tap(() => this.genericMetaMediaIndSetter(false, topic)),
      flatMap(() =>
        this.ss.editObject(
          NotificationService.NOTIFICATIONS_TOPICS,
          topic,
          false
        )
      )
    );
  }

  // ** SUB/UNSUB - TOPIC -  Part

  private subscribeAllTopic(topics: string[]) {
    const subAll$ = topics.map((topic) => this.subscribeTopic(topic));
    return concat(...subAll$);
  }

  private unsubscribeAllTopic(topics: string[]) {
    const unsubAll$ = topics.map((topic) => this.unsubscribeTopic(topic));
    return concat(...unsubAll$);
  }

  private subscribeTopic(topic: string): Observable<any> {
    return of(1);
    // return from(this.firebaseX.subscribe(topic));
  }

  private unsubscribeTopic(topic: string): Observable<any> {
    return of(1);
    // return from(this.firebaseX.unsubscribe(topic));
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
      throw new Error("L'objet est null");
    }
  }
}

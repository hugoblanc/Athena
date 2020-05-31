import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import listMetaMediaData from '../../../assets/data/listMetaMediaData.json';
import { ListMetaMedias } from '../../models/meta-media/list-meta-medias';
import { MetaMedia } from '../../models/meta-media/meta-media';
import { AlertService } from '../helper/alert.service.js';
import { HttpService } from '../helper/http.service';
import { StorageService } from '../helper/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MetaMediaService {
  private static BASE_URL = 'https://www.athena-app.fr/list-meta-media';
  private installDate: Date;

  public listMetaMedia: ListMetaMedias[] = listMetaMediaData;
  public listMetaMedia$ = new BehaviorSubject(this.listMetaMedia);
  public currentMetaMedia: MetaMedia;

  constructor(private http: HttpService,
              private storage: StorageService,
              private alertService: AlertService) {

    this.getMetaMediaList()
      .subscribe((listMetaMedia) => {
        console.log('Meta media récupéré');
      });
    this.storage.get<Date>(StorageService.INSTALLATION_DATE)
      .subscribe((dateInstall) => {
        try {
          if (dateInstall) {
            this.installDate = new Date(dateInstall);
          } else {
            this.installDate = new Date();
            this.storage.set(StorageService.INSTALLATION_DATE, this.installDate);
          }
        } catch (error) {
          console.error(error);
        }
      });

  }


  public getMetaMediaList(): Observable<ListMetaMedias[]> {
    return this.http.get(MetaMediaService.BASE_URL)
      .pipe(tap((data: ListMetaMedias[]) => {
        if (data && data.length > 0) {
          this.listMetaMedia = data.map((lstMetaMedia) => new ListMetaMedias(lstMetaMedia));
          this.listMetaMedia$.next(this.listMetaMedia);
        }
      }));
  }

  public findAndSetMediaByKey(key: string): MetaMedia {
    for (const lstMetaMedia of this.listMetaMedia) {
      this.currentMetaMedia = lstMetaMedia.metaMedias.find((metaMedia) => metaMedia.key === key);
      if (this.currentMetaMedia != null) {
        this.dealWithTips();
        return this.currentMetaMedia;
      }
    }
  }

  /**
   * La methode qui ira chercher et mettre a jour le nombre de count d'un media
   * le nombre de count correspond au nombre de fois au l'utilisateur va aller
   * voir le contenu du media en question
   * On s'en sert pour la proposition de dons
   * Car si on met le lien en direct, on se fait kicker par les stores
   * Pour non prespect de la privacy policy
   */
  public dealWithTips() {
    this.storage.get<any>(StorageService.COUNT_KEY)
      .subscribe((counts: any) => {
        // S'il n'y a auncune données en storage
        if (counts == null) {
          // On init l'objet
          counts = {};
        }

        if (counts[this.currentMetaMedia.key] == null) {
          // On init la clé
          counts[this.currentMetaMedia.key] = { count: 1 };

        } else {
          // Dans le cas ou il y a déjà une valeur
          const metamediaCount = counts[this.currentMetaMedia.key];
          metamediaCount.count++;
          if (metamediaCount.lastAsk != null) {
            metamediaCount.lastAsk = new Date(metamediaCount.lastAsk);
          }
          counts[this.currentMetaMedia.key] = metamediaCount;
        }

        // Création d'une date vielle de 5 jours
        let a = new Date();
        a = new Date(a.getTime() - (1000 * 60 * 60 * 24 * 5));
        // a = new Date(a.getTime() - 20000);

        const mcount = counts[this.currentMetaMedia.key];
        // Vérification de l'ensemble des critères
        // Date d'install plus petite de 5 jours mini (pour passer la vérif du store)

        if (this.installDate != null && this.installDate < a
          // Que l'utilisateur est incrémenté son compte de 10 passage sur le currentmedia
          && mcount.count > 10
          // QUe le lien de donation ne soit pas null
          && this.currentMetaMedia.donation != null
          // Et même qu'il ne soit pas juste vide
          && this.currentMetaMedia.donation.length > 2
          && (mcount.lastAsk == null || mcount.lastAsk < a)) {

          // Si on a passé l'ensemble des condition alors on affiche une alerte pour proposer de soutneir
          this.currentMetaMedia.isDonationActivated = true;
          this.alertService.openExternalLink('Soutenir ' + this.currentMetaMedia.title,
            'On dirait bien que vous appréciez ce contenu, souhaitez-vous soutenir les auteurs ? ', this.currentMetaMedia.donation);
          // On update a date de dernière mise a jour
          counts[this.currentMetaMedia.key].lastAsk = new Date();
        }

        // On set les informations en persitant dans le storage
        this.storage.set(StorageService.COUNT_KEY, counts);


      });
  }



}

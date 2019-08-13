import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, count } from 'rxjs/operators';
import { ListMetaMedias } from '../../models/meta-media/list-meta-medias';
import { MetaMedia } from '../../models/meta-media/meta-media';
import listMetaMediaData from '../../../assets/data/listMetaMediaData.json';
import { HttpService } from '../helper/http.service';
import { StorageService } from '../helper/storage.service';
import { AppComponent } from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class MetaMediaService {
  constructor(private http: HttpService, private storage: StorageService) {

    this.getMetaMediaList()
      .subscribe((listMetaMedia) => {
        console.log('Meta media récupéré');
      });
    this.storage.get<Date>(StorageService.INSTALLATION_DATE)
      .subscribe((dateInstall) => {
        try {
          this.installDate = new Date(dateInstall);
        } catch (error) {
          //
        }
      });

  }
  public static BASE_URL = 'https://athena-api.caprover.athena-app.fr/list-meta-media';

  installDate: Date;

  public listMetaMedia: ListMetaMedias[] = listMetaMediaData;
  public listMetaMedia$ = new BehaviorSubject(this.listMetaMedia);

  currentMetaMedia: MetaMedia;

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
          // Et on init le champ relatif au edia courant
          counts[this.currentMetaMedia.key] = { count: 1 };
          this.storage.set(StorageService.COUNT_KEY, counts);
          // Si l'objet n'est pas nul mais qu'il n'y a rien pour cette clé
        } else if (counts[this.currentMetaMedia.key] == null) {
          // On init la clé
          counts[this.currentMetaMedia.key] = { count: 1 };
          // on set en storage
          this.storage.set(StorageService.COUNT_KEY, counts);
        } else {
          // Dans le cas ou il y a déjà une valeur
          const metamediaCount = counts[this.currentMetaMedia.key];
          metamediaCount.count++;
          counts[this.currentMetaMedia.key] = metamediaCount;
          this.storage.set(StorageService.COUNT_KEY, counts);
        }
        // Ici on vérifie la date, elle doit être plus petite d'au moins 5 jour
        let a = new Date();
        a = new Date(a.getTime() + 432000000);
        if (this.installDate != null && this.installDate < a
          && counts[this.currentMetaMedia.key].count > 10) {


        }


      });
  }



}

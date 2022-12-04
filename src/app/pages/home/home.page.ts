
import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/github/github';
import { ListMetaMedias } from '../../models/meta-media/list-meta-medias';
import { MetaMediaService } from '../../provider/meta-media/meta-media.service';

/**
 * Cette page est la paremière page qui est chargé dans le cas classique
 * On évitera de mettre trop de logique ici
 * On préfèrera l'approche composant pour décharger la page principale
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public metaMediaService: MetaMediaService) {

  }

  listMetaMedia!: ListMetaMedias[];
  videos!: [];
  width!: string;
  issues: Issue[] = [];
  loading = true;


  ngOnInit(): void {
    this.loading = true;
    this.metaMediaService.listMetaMedia$
      .subscribe((listMetaMedia: ListMetaMedias[]) => {
        this.listMetaMedia = listMetaMedia;
        this.loading = false;
      });
  }


}

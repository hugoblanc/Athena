import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediasService } from '../medias.service';
import { Post } from '../models/post';
import { StyleService } from '../provider/style.service';
import { MetaMedia } from '../models/meta-media';

@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
})
export class MediaPage implements OnInit {

  medias: MetaMedia[] = [
    { url: 'https://lvsl.fr/', title: 'Le vent se lève', color: 'tertiary' },
    { url: 'https://mrmondialisation.org/', title: 'Mr Mondialisation', color: 'secondary' },
    { url: 'https://www.4emesinge.com/', title: 'Mr Mondialisation', color: 'primary' },
  ];


  id: number;
  posts: Post[];

  currentMedia: MetaMedia;

  constructor(private route: ActivatedRoute,
              public mediasService: MediasService,
              public styleService: StyleService) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    // Initialisation de l'id courant
    const id = this.route.snapshot.paramMap.get('id');
    this.id = parseInt(id, 10);

    // récupération des information du média associé
    this.currentMedia = this.medias[this.id];

    // Config de la couleur principale du media
    this.styleService.setPrimaryColor(this.currentMedia.color);


    // Initiailisation Récupération des données sur wordpress
    this.initData(this.currentMedia.url);
  }


  initData(url: string) {
    // Appel de la méhode du service
    this.mediasService.getDataByUrl(url)
      .subscribe((posts: Post[]) => {
        // Affectation des données serveur dans notre variable local
        this.posts = posts;
      });
  }


  openExternalPage(url: string) {
    window.open(url, '_system’');
  }

}

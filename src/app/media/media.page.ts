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




    idMedia: number;
    posts: Post[];
    loading= false;

    currentMedia: MetaMedia;

    constructor(private route: ActivatedRoute,
                public mediasService: MediasService,
                public styleService: StyleService) { }

    ngOnInit() {
    }


    ionViewWillEnter() {
      // Initialisation de l'id courant
      const id = this.route.snapshot.paramMap.get('id');
      this.idMedia = parseInt(id, 10);

      // récupération des information du média associé
      this.currentMedia = MediasService.MEDIAS[this.idMedia];

      // Config de la couleur principale du media
      this.styleService.setPrimaryColor(this.currentMedia.color);


      // Initiailisation Récupération des données sur wordpress
      this.initData(this.currentMedia.url);
    }


    initData(url: string) {
      // Appel de la méhode du service
      this.loading = true; 
      this.mediasService.getDataByUrl(url)
        .subscribe((posts: Post[]) => {
          // Affectation des données serveur dans notre variable local
          this.posts = posts;
          this.loading = false;
        }, (error) => {
          console.error(error);
          this.loading = false;
        });
    }


    openExternalPage(url: string) {
      window.open(url, '_system’');
    }

  }

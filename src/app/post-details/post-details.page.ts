import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediasService } from '../provider/content/medias.service';
import { Post } from '../models/content/wordpress/post';
import { MetaMedia } from '../models/meta-media/meta-media';

/**
 * *~~~~~~~~~~~~~~~~~~~
 * Author: HugoBlanc |
 * *~~~~~~~~~~~~~~~~~~~
 * Cette page permet d'afficher les détails d'un article une fois qu'on a cliqué dessus
 * *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  idPost: number;
  post: Post;
  currentMedia: MetaMedia;

  constructor(private route: ActivatedRoute,
              public mediasService: MediasService,
              private zone: NgZone) { }

  ionViewWillEnter() {
    const idPost = this.route.snapshot.paramMap.get('id');
    this.idPost = parseInt(idPost, 10);
    this.post = this.mediasService.findLocalPostById(this.idPost);
    this.currentMedia = this.mediasService.currentMetaMedia;

    if (!this.post) {
      // Comme on utilise un plugin pour les call en natif sur mobile il faut forcer la zone angular
      // Si on fait pas ça bug a l'affichage
      this.zone.run(() => {
        this.mediasService.getPostByID(this.currentMedia, this.idPost)
          .subscribe((post) => {
            this.post = post;
          });
      });
    }
  }

  ngOnInit() {
  }

  openExternalPage(url: string) {
    window.open(url, '_system’');
  }

}

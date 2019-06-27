import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediasService } from '../medias.service';
import { Post } from '../models/post';
import { MetaMedia } from '../models/meta-media';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  idPost: number;
  post: Post;
  currentMedia: MetaMedia;

  constructor(private route: ActivatedRoute, private mediaService: MediasService) { }

  ionViewWillEnter() {
    const idPost = this.route.snapshot.paramMap.get('id');
    const idMedia = this.route.snapshot.paramMap.get('idMedia');
    this.idPost = parseInt(idPost, 10);
    this.post = this.mediaService.findLocalPostById(this.idPost);
    this.currentMedia = MediasService.MEDIAS[parseInt(idMedia)];
  }

  ngOnInit() {
  }

}

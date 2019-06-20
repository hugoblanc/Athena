import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediasService } from '../medias.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  idPost: number;
  post: Post;

  constructor(private route: ActivatedRoute, private mediaService: MediasService) { }

  ionViewWillEnter() {
    const idPost = this.route.snapshot.paramMap.get('id');
    this.idPost = parseInt(idPost, 10);
    this.post = this.mediaService.findLocalPostById(this.idPost);
  }

  ngOnInit() {
  }

}

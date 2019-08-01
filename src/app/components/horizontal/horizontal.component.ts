import { Component, OnInit, Input } from '@angular/core';
import { ListMetaMedias } from '../../models/meta-media/list-meta-medias';

@Component({
  selector: 'ath-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
})
export class HorizontalComponent implements OnInit {

  @Input() listMetaMedia: ListMetaMedias;


  constructor() { }


  ngOnInit() {

  }


}

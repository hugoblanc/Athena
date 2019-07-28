import { Component, OnInit, Input } from '@angular/core';
import { MetaMedia } from '../../models/meta-media/meta-media';

@Component({
  selector: 'ath-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() media: MetaMedia;


  constructor() { }

  ngOnInit() {}

}

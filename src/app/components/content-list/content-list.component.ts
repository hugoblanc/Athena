import { Component, OnInit, Input, Injector } from '@angular/core';
import { MetaMediaService } from '../../provider/meta-media/meta-media.service';

@Component({
  selector: 'ath-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss'],
})
export class ContentListComponent implements OnInit {

  @Input() contents: any[];
  metaMediaKey: string;
  constructor(private metaMediaService: MetaMediaService) { }

  ngOnInit() {
    this.metaMediaKey = this.metaMediaService.currentMetaMedia.key;
  }

}

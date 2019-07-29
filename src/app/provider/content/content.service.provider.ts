import { MetaMediaService } from '../meta-media/meta-media.service';
import { MediasService } from './medias.service';
import { YoutubeService } from './youtube.service';
import { ContentService } from './content.service';
import { MetaMediaType } from '../../models/meta-media/meta-media-type.enum';
import { Injector } from '@angular/core';

const contentServiceFactory = (metaMediaService: MetaMediaService, injector: Injector) => {
  if (metaMediaService.currentMetaMedia.type === MetaMediaType.WORDPRESS) {
    return injector.get(MediasService);
  } else {
    return injector.get(YoutubeService);
  }
};

export let contentServiceProvider = {
  provide: ContentService,
  useFactory: contentServiceFactory,
  deps: [MetaMediaService, Injector]
};

import { MetaMediaService } from '../meta-media/meta-media.service';
import { HttpService } from '../helper/http.service';
import { MediasService } from './medias.service';
import { YoutubeService } from './youtube.service';
import { ContentService } from './content.service';
import { MetaMediaType } from '../../models/meta-media/meta-media-type.enum';

const contentServiceFactory = (http: HttpService, metaMediaService: MetaMediaService) => {
  if (metaMediaService.currentMetaMedia.type === MetaMediaType.WORDPRESS) {
    return new MediasService(http, metaMediaService);
  } else {
    return new YoutubeService(http, metaMediaService);
  }
};

export let contentServiceProvider = {
  provide: ContentService,
  multi: false,
  useFactory: contentServiceFactory,
  deps: [HttpService, MetaMediaService]
};

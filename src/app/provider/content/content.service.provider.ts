import { MetaMediaService } from '../meta-media/meta-media.service';
import { HttpService } from '../helper/http.service';
import { MediasService } from './medias.service';
import { YoutubeService } from './youtube.service';
import { ContentService } from './content.service';

const contentServiceFactory = (http: HttpService, metaMediaService: MetaMediaService) => {
  if  (false) {
    return new MediasService(http, metaMediaService);
  } else {
    return new YoutubeService(http, metaMediaService);
  }
};

export let contentServiceProvider = {
  provide: ContentService,
  useFactory: contentServiceFactory,
  deps: [HttpService, MetaMediaService]
};

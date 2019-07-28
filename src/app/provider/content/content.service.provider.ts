import { MetaMediaService } from '../meta-media/meta-media.service';
import { HttpService } from '../helper/http.service';
import { MediasService } from './medias.service';
import { YoutubeService } from './youtube.service';

const contentServiceFactory = (http: HttpService, metaMediaService: MetaMediaService) => {
  if  (true) {
    return new MediasService(http, metaMediaService);
  } else {
    return new YoutubeService(http, metaMediaService);
  }
};

export let contentServiceProvider = {
  provide: MediasService || YoutubeService,
  useFactory: contentServiceFactory,
  deps: [HttpService, MetaMediaService]
};

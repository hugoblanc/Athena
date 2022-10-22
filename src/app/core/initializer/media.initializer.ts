import { Observable } from 'rxjs';
import { MetaMediaService } from '../../provider/meta-media/meta-media.service';

export function initializeAppFactory(metaMediaService: MetaMediaService): () => Observable<any> {
  return () => metaMediaService.init();
}

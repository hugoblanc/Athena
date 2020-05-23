import { Injector } from '@angular/core';
import { MetaMediaType } from '../../models/meta-media/meta-media-type.enum';
import { MetaMediaService } from '../meta-media/meta-media.service';
import { ContentService } from './content.service';
import { WordpressService } from './wordpress.service';
import { YoutubeService } from './youtube.service';

/**
 * Cette classe permet de gérer l'injection du ContentService
 * Elle nous permet d'injecter un interface au lieu d'un implémentation
 * La résolution du service se fera pendant l'execution et dépendra du context
 * Le context est ici récupérer via metaMediaService
 * On évalue le type du currentMetaME
 * @param metaMediaService le service qui comporte notre contexte
 * @param injector l'element qui permet l'injection manuelle de service(@Injectable)
 */
const contentServiceFactory = (metaMediaService: MetaMediaService, injector: Injector) => {
  // Comme on peut le voir en fonction du type de currentMEtaMEdia, on va chargé un service ou bien l'autre
  if (metaMediaService.currentMetaMedia.type === MetaMediaType.WORDPRESS) {
    return injector.get(WordpressService);
  } else {
    return injector.get(YoutubeService);
  }
};

// Finalement on export le bon objet pour être gérable par les annotation angular de composant
export let contentServiceProvider = {
  provide: ContentService,
  useFactory: contentServiceFactory,
  deps: [MetaMediaService, Injector]
};

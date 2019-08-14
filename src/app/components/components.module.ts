import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AthLoaderComponent } from './ath-loader/ath-loader.component';
import { HeaderModalComponent } from './header-modal/header-modal.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { ImgComponent } from './img/img.component';
import { SectionComponent } from './section/section.component';
import { Slides3dComponent } from './slides3d/slides3d.component';
import { YoutubeIframeComponent } from './youtube-iframe/youtube-iframe.component';
import { DonationComponent } from './donation/donation.component';
import { CardComponent } from './card/card.component';

/**
 * Ce module intègre l'ensembles des composants qui sont globaux à l'application
 * Les composants qui se trouve ici devrait donc en théorie être présent dans plusieurs pages
 * de modules différents.
 * Si ça n'est pas le cas, il devrait déclaré dans les modules de la page en question
 */
@NgModule({
  declarations: [AthLoaderComponent,
    HorizontalComponent,
    ImgComponent,
    YoutubeIframeComponent,
    Slides3dComponent,
    SectionComponent,
    HeaderModalComponent,
    DonationComponent,
    CardComponent
  ],
  exports: [AthLoaderComponent,
    HorizontalComponent,
    ImgComponent,
    YoutubeIframeComponent,
    Slides3dComponent,
    SectionComponent,
    HeaderModalComponent,
    DonationComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule
  ]
})
export class ComponentsModule { }

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "../components/components.module";
import { DirectivesModule } from "../directives/directives.module";
import { ArticleDetailsComponent } from "./components/article-details/article-details.component";
import { MoonModeComponent } from "./components/moon-mode/moon-mode.component";
import { ReadingProgressComponent } from "./components/reading-progress/reading-progress.component";
import { VideoDetailsComponent } from "./components/video-details/video-details.component";
import { VideoHeaderComponent } from "./components/video-header/video-header.component";
import { ContentDetailsPage } from "./content-details.page";

/**
 * Ce module concerne la page des détails d'un contenu
 * Le contenu peut être de plusieurs type
 * Wordpress (Post) et youtube(ItemVideo) en font partie
 */
const routes: Routes = [
  {
    path: "",
    component: ContentDetailsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    DirectivesModule,
  ],
  declarations: [
    ContentDetailsPage,
    ArticleDetailsComponent,
    VideoDetailsComponent,
    VideoHeaderComponent,
    MoonModeComponent,
    ReadingProgressComponent,
  ],
  exports: [ArticleDetailsComponent, VideoDetailsComponent],
})
export class ContentDetailsPageModule {}

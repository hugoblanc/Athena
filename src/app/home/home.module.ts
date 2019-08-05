import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../components/components.module';
import { HomePage } from './home.page';
import { IssueModule } from '../issue/issue.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    ComponentsModule,
    IssueModule
  ],
  declarations: [HomePage],
  providers: [FirebaseX]
})
export class HomePageModule { }

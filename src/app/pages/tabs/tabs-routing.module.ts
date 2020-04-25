import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'construction',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../construction/construction.module').then(m => m.ConstructionPageModule)
          }
        ]
      },
      {
        path: 'informations',
        children: [
          {
            path: '',
            loadChildren: () => import('../informations/informations.module').then(m => m.InformationsPageModule)
          }
        ]
      },
      // {
      //   path: 'guide',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('../guide/guide.module').then(m => m.GuidePageModule)
      //     }
      //   ]
      // },
      // {
      //   path: 'calendar',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('../calendar/calendar.module').then(m => m.CalendarPageModule)
      //     }
      //   ]
      // },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

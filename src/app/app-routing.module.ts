import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'inversion/:instrument/:tuning/:note/:type/:inversion',
    loadChildren: './details/details.module#DetailsPageModule',
    pathMatch: 'full'
  },
  {
    path: 'chord/:instrument/:tuning/:note/:type',
    loadChildren: './pages/chord/chord.module#ChordPageModule',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

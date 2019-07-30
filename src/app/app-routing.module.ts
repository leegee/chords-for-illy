import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { TabsPageModule } from './tabs/tabs.module';
import { ChordPageModule } from './pages/chord/chord.module';

// export const routes: Routes = [
//   { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
//   { path: 'chord/:instrument/:tuning/:note/:type', loadChildren: './pages/chord/chord.module#ChordPageModule' }
// ];

export const routes: Routes = [
  { path: '', component: TabsPageModule },
  { path: 'chord/:instrument/:tuning/:note/:type', component: ChordPageModule }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

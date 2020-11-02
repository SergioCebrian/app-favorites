import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesFilterPage } from './page/favorites-filter.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesFilterPageRoutingModule {}

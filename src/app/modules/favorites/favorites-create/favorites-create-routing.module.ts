import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesCreatePage } from './page/favorites-create.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesCreatePageRoutingModule {}

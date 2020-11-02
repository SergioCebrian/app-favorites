import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesEditPage } from './page/favorites-edit.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesEditPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesPage } from './categories.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage,
  },
  {
    path: 'new',
    loadChildren: () => import('./categories-create/categories-create.module').then( m => m.CategoriesCreatePageModule)
  },
  {
    path: 'edit/:slug',
    loadChildren: () => import('./categories-edit/categories-edit.module').then( m => m.CategoriesEditPageModule)
  },
  {
    path: ':category',
    loadChildren: () => import('../favorites/favorites-filter/favorites-filter.module').then( m => m.FavoritesFilterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule {}

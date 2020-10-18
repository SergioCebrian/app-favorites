import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesPage } from './categories.page';
import { AuthGuard } from '@guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    loadChildren: () => import('./categories-create/categories-create.module').then( m => m.CategoriesCreatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:slug',
    loadChildren: () => import('./categories-edit/categories-edit.module').then( m => m.CategoriesEditPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: ':category',
    loadChildren: () => import('../favorites/favorites-filter/favorites-filter.module').then( m => m.FavoritesFilterPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule {}

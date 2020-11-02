import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesPage } from './page/categories.page';
import { AuthGuard } from '@guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    loadChildren: () => import('./categories-create/categories-create.module').then( m => m.CategoriesCreatePageModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:slug',
    loadChildren: () => import('./categories-edit/categories-edit.module').then( m => m.CategoriesEditPageModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: ':category',
    loadChildren: () => import('../favorites/favorites-filter/favorites-filter.module').then( m => m.FavoritesFilterPageModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule {}

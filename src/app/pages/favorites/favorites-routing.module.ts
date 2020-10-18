import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';

const routes: Routes = [
  {
    path: 'new',
    loadChildren: () => import('./favorites-create/favorites-create.module').then( m => m.FavoritesCreatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:slug',
    loadChildren: () => import('./favorites-edit/favorites-edit.module').then( m => m.FavoritesEditPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: ':category',
    loadChildren: () => import('./favorites-filter/favorites-filter.module').then( m => m.FavoritesFilterPageModule),
    canActivate: [AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesPageRoutingModule {}

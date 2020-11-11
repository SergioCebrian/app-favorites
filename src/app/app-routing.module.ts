import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./modules/categories/categories.module').then( m => m.CategoriesPageModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'favorites',
    loadChildren: () => import('./modules/favorites/favorites.module').then( m => m.FavoritesPageModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'history',
    loadChildren: () => import('./modules/history/history.module').then( m => m.HistoryPageModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'likes',
    loadChildren: () => import('./modules/likes/likes.module').then( m => m.LikesPageModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'results',
    loadChildren: () => import('./modules/search-results/search-results.module').then( m => m.SearchResultsPageModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { SearchResultsPage } from './page/search-results.page';

const routes: Routes = [
  {
    path: '',
    component: SearchResultsPage,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchResultsPageRoutingModule {}

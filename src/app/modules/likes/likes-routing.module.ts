import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';

import { LikesPage } from './page/likes.page';

const routes: Routes = [
  {
    path: '',
    component: LikesPage,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikesPageRoutingModule {}

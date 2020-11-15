import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';
import { TimelinePage } from './page/timeline.page';

const routes: Routes = [
  {
    path: '',
    component: TimelinePage,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: ':timeline',
    component: TimelinePage,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimelinePageRoutingModule {}

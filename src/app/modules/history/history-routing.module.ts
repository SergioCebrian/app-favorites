import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { HistoryPage } from './page/history.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryPage,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryPageRoutingModule {}

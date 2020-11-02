import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { HomePage } from './page/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}

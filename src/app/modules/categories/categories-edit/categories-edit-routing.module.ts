import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesEditPage } from './page/categories-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesEditPageRoutingModule {}

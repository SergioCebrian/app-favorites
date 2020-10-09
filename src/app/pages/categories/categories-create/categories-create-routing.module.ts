import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesCreatePage } from './categories-create.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesCreatePageRoutingModule {}

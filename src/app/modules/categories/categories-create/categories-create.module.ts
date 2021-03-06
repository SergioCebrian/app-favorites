import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CategoriesCreatePageRoutingModule } from './categories-create-routing.module';
import { CategoriesCreatePage } from './page/categories-create.page';
import { CategoriesCreateComponent } from './components/categories-create.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    CategoriesCreatePageRoutingModule
  ],
  declarations: [
    CategoriesCreateComponent,
    CategoriesCreatePage
  ],
  exports: [
    CategoriesCreateComponent
  ]
})
export class CategoriesCreatePageModule {}

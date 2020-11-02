import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LikesPageRoutingModule } from './likes-routing.module';
import { LikesPage } from './page/likes.page';
import { LikesListComponent } from './likes-list/components/likes-list.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LikesPageRoutingModule
  ],
  declarations: [
    LikesPage,
    LikesListComponent
  ],
  exports: [
    LikesListComponent
  ]
})
export class LikesPageModule {}

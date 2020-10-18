import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ImportantsPageRoutingModule } from './importants-routing.module';
import { ImportantsPage } from './importants.page';
import { ImportantsListComponent } from '@components/importants/importants-list/importants-list.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ImportantsPageRoutingModule
  ],
  declarations: [
    ImportantsPage,
    ImportantsListComponent
  ],
  exports: [
    ImportantsListComponent
  ]
})
export class ImportantsPageModule {}

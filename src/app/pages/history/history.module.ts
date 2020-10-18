import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HistoryPageRoutingModule } from './history-routing.module';
import { HistoryPage } from './history.page';
import { HistoryListComponent } from '@components/history/history-list/history-list.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    HistoryPageRoutingModule
  ],
  declarations: [
    HistoryPage,
    HistoryListComponent
  ],
  exports: [
    HistoryListComponent
  ]
})
export class HistoryPageModule {}

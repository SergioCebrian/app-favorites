import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';
import { HistoryPage } from './page/history.page';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { LogsListComponent } from './components/logs-list/logs-list.component';
import { SharedModule } from '@shared/shared.module';

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
    HistoryListComponent,
    LogsListComponent
  ],
  exports: [
    HistoryListComponent,
    LogsListComponent
  ]
})
export class HistoryPageModule {}

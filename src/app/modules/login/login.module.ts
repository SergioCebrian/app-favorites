import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './page/login.page';
import { LoginComponent } from './components/login.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LoginPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    LoginPage
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginPageModule {}

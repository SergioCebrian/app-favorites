import { Component, OnInit } from '@angular/core';

import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() { }

  signIn(event: any): void {
    this.authService
        .signIn(event.userData)
        .then(resp => resp)
        .catch(err => console.error(err));
  }

}

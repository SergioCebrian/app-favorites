import { Location } from '@angular/common';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string;

  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  logOut(): void {
    this.authService
        .logOut()
        .then(() => this.router.navigate(['/login']));
  }

}

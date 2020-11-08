import { Location } from '@angular/common';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-header-transparent',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header-transparent.component.html',
  styleUrls: ['./header-transparent.component.scss'],
})
export class HeaderTransparentComponent implements OnInit {

  @Input()
  customClass?: string;

  @Input()
  data?: any;

  @Input()
  title: string;

  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  goBack() {
    this.location.back();
  }

  logOut(): void {
    this.authService
        .logOut()
        .then(() => this.router.navigate(['/login']));
  }

}

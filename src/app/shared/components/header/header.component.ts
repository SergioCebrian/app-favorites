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
  customClass?: string;

  @Input()
  title: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  logOut(): void {
    this.authService
        .logOut()
        .then(() => this.router.navigate(['/login']));
  }

}

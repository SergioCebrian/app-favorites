import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canLoad(): Observable<boolean> {
    return this.authService
               .isAuth()
               .pipe(
                 tap(state => {
                   if (!state) {
                    this.router.navigate(['/login']);
                   }
                 }),
                 take(1)
               );
  }

  canActivate(): Observable<boolean> {
    return this.authService
               .isAuth()
               .pipe(
                 tap(state => {
                   if (!state) {
                    this.router.navigate(['/login']);
                   }
                 })
               );
  }
  
}

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthService).isLoggedIn();
  if (!isLoggedIn) {
    inject(Router).navigate(['login']);
  }
  return isLoggedIn;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.isLoggedIn();
  const isAdmin = authService.isAdmin();

  if (!isLoggedIn) {
    inject(Router).navigate(['login']);
  }

  return isLoggedIn && isAdmin;
};

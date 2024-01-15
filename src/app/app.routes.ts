import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { BookListComponent } from './books/book-list/book-list.component';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: '',
    title: 'Home',
    component: BookListComponent,
    canActivate: [authGuard],
  },
];

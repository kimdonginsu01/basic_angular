import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'home',
    title: 'Home',
    component: BookListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'book-detail/:id',
    title: 'Books',
    component: BookDetailComponent,
    canActivate: [authGuard],
  },
];

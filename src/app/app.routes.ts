import { Routes } from '@angular/router';
import { adminGuard, authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookManagementComponent } from './books/book-management/book-management.component';

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
    path: 'dashboard/books',
    title: 'Books',
    component: BookManagementComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'book-detail/:id',
    title: 'Books',
    component: BookDetailComponent,
    canActivate: [authGuard],
  },
];

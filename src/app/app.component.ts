import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './shared/components/header/header.component';
import { SharedModule } from 'primeng/api';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { CartModule } from './cart/cart.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    BooksModule,
    CartModule,
    HeaderComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular Learning';
}

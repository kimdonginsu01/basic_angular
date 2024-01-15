import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { CartModule } from './cart/cart.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    BooksModule,
    CartModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular Learning';

  constructor(public authService: AuthService) {}
}

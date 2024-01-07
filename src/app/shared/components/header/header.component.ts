import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    MenubarModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items: MenuItem[];

  constructor(public authService: AuthService) {
    this.items = [
      { label: 'Home', routerLink: '/home' },
      { label: 'Books', routerLink: '/books' },
      { label: 'Authors', routerLink: '/authors' },
      { label: 'Genres', routerLink: '/genres' },
      { label: 'Best Sellers', routerLink: '/bestsellers' }
    ];
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    MenubarModule,
    BadgeModule,
    CommonModule,
    OverlayPanelModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @ViewChild(OverlayPanel) private op!: OverlayPanel;
  items: MenuItem[];
  cartItems = [];

  constructor(
    public authService: AuthService,
    public router: Router,
    public cartService: CartService
  ) {
    this.items = [
      { label: 'Home', routerLink: '/home' },
      { label: 'Books', routerLink: '/books' },
      { label: 'Authors', routerLink: '/authors' },
      { label: 'Genres', routerLink: '/genres' },
      { label: 'Best Sellers', routerLink: '/bestsellers' },
    ];
  }

  ngOnInit(): void {
    const { id } = this.authService.getCurrentUser();
    this.cartService.getUserCart(id).subscribe({
      next: (res) => {
        this.cartService.updateCart(res);
      },
    });
    this.cartService.cart$.subscribe((value: any) => {
      this.cartItems = value;
    });
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  handleToggleOverlayPanel(event: any) {
    console.log(this.cartItems)
    this.op.toggle(event);
  }
}

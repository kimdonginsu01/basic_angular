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
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    MenubarModule,
    BadgeModule,
    CommonModule,
    OverlayPanelModule,
    DropdownModule,
    TableModule,
    InputNumberModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @ViewChild(OverlayPanel) private op!: OverlayPanel;
  items: MenuItem[];
  cartItems: any = [];
  totalPrice: number = 0;

  private updateCartSubject = new Subject<{
    event: InputNumberInputEvent;
    productId: number;
  }>();

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
    this.cartService.cart$.subscribe((value: any) => {
      this.cartItems = value;
      this.totalPrice = this.calculateTotalPrice(this.cartItems);
    });

    this.getUserCart(id);

    this.updateCartSubject
      .pipe(
        debounceTime(300),
        switchMap(({ event, productId }) => {
          return this.cartService.updateCartProduct(productId, {
            quantity: event.value,
          });
        }),
        switchMap(() => {
          const { id } = this.authService.getCurrentUser();
          return this.cartService.getUserCart(id);
        })
      )
      .subscribe((updatedCart) => {
        this.cartItems = updatedCart;
        this.totalPrice = this.calculateTotalPrice(this.cartItems);
      });
  }

  getUserCart(userId: number) {
    this.cartService.getUserCart(userId).subscribe({
      next: (res) => {
        this.cartService.updateCart(res);
      },
    });
  }

  calculateTotalPrice(cartItems: any[]) {
    return cartItems.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  handleToggleOverlayPanel(event: any) {
    console.log(this.cartItems);
    this.op.toggle(event);
  }

  handleUpdateCart(event: InputNumberInputEvent, productId: number) {
    this.updateCartSubject.next({ event, productId });
  }
}

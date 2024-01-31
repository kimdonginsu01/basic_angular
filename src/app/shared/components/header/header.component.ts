import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Subject, debounceTime, of, switchMap } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { CartService } from '../../services/cart.service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

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
    ConfirmDialogModule,
    ToastModule,
    ConfirmPopupModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class HeaderComponent implements OnInit {
  @ViewChild(OverlayPanel) private op!: OverlayPanel;
  items: MenuItem[];
  cartItems: any = [];
  totalPrice: number = 0;
  currentUserId: number;

  private updateCartSubject = new Subject<{
    event: InputNumberInputEvent;
    productId: number;
  }>();

  constructor(
    public authService: AuthService,
    public router: Router,
    public cartService: CartService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    const { id } = this.authService.getCurrentUser();
    this.currentUserId = id;
    this.items = [
      { label: 'Home', routerLink: '/home' },
      { label: 'Books', routerLink: '/books' },
      { label: 'Authors', routerLink: '/authors' },
      { label: 'Genres', routerLink: '/genres' },
      { label: 'Best Sellers', routerLink: '/bestsellers' },
    ];
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((value: any) => {
      this.cartItems = value;
      this.totalPrice = this.calculateTotalPrice(this.cartItems);
    });

    this.getUserCart(this.currentUserId);

    this.updateCartSubject
      .pipe(
        debounceTime(300),
        switchMap(({ event, productId }) => {
          if (event.value && +event.value <= 20) {
            return this.cartService.updateCartProduct(productId, {
              quantity: event.value,
            });
          } else {
            return of(this.cartItems);
          }
        }),
        switchMap((cartItems) => {
          if (Array.isArray(cartItems)) {
            return of(cartItems);
          } else {
            return this.cartService.getUserCart(this.currentUserId);
          }
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

  handleDeleteCartItem(event: Event, userId: number) {
    event.stopPropagation();
    console.log(userId)
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this item?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        // this.cartService.deleteCartItem(productId).subscribe(() => {
        //   this.messageService.add({
        //     severity: 'info',
        //     summary: 'Confirmed',
        //     detail: 'Item deleted',
        //   });
        //   // Refresh the cart after deletion
        //   this.getUserCart(this.currentUserId);
        // });
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { BooksService } from '../books.service';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { Product } from '../shared/models/book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    RatingModule,
    InputNumberModule,
    TagModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private cartService: CartService,
    private authService: AuthService,
    private msgService: MessageService
  ) {}

  product: Product = {};
  quantity: number = 1;

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      const prodId = this.route.snapshot.paramMap.get('id');

      if (prodId) {
        this.getBookDetail(prodId);
      }
    });
  }

  getBookDetail(id: string) {
    this.booksService.getBookDetail(id).subscribe({
      next: (response) => {
        this.product = response;
      },
    });
  }

  handleAddToCart() {
    const { id } = this.authService.getCurrentUser();
    const productCartData = {
      booksId: this.product.id,
      price: this.product.price,
      quantity: this.quantity,
      usersId: id,
    };
    this.cartService.createCartProduct(productCartData).subscribe({
      next: () => {
        this.msgService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Add product to cart successfully!',
        });

        this.cartService.getUserCart(id).subscribe({
          next: (res) => {
            this.cartService.updateCart(res);
          },
        });
      },
      error: () => {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Add product to cart failed!',
        });
      },
    });
  }
}

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
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
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
    console.log({ quantity: this.quantity, price: this.product.price });
  }
}

import { Component, OnInit } from '@angular/core';
import { FilterSidebarComponent } from '../../shared/components/filter-sidebar/filter-sidebar.component';
import { ImageModule } from 'primeng/image';
import { BooksService } from '../books.service';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { Product } from '../shared/models/book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    FilterSidebarComponent,
    ImageModule,
    DataViewModule,
    TagModule,
    RatingModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    TooltipModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  constructor(private bookService: BooksService) {}

  layout: 'list' | 'grid' = 'grid';
  products: Product[] = [];

  ngOnInit() {
    this.bookService.getBooks().subscribe({
      next: (response) => {
        this.products = response;
      },
    });
  }

  getSeverity(product: Product) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return '';
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { BooksService } from '../books.service';
import { Product } from '../shared/models/book';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    RatingModule,
    TagModule,
    RouterModule,
    FormsModule,
    TooltipModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    BookModalComponent,
    DynamicDialogModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.scss',
  providers: [DialogService, ConfirmationService],
})
export class BookManagementComponent {
  constructor(
    private bookService: BooksService,
    private msgService: MessageService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ref: DynamicDialogRef | undefined;
  layout: 'list' | 'grid' = 'grid';
  products: Product[] = [];
  isBookModalOpen: boolean = false;

  ngOnInit() {
    this.getBooksList();
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

  handleOpenModal(data: { type: string; product?: Product }) {
    const { type, product } = data;

    this.ref = this.dialogService.open(BookModalComponent, {
      header: 'Book details',
      draggable: false,
      style: {
        maxWidth: '60vw',
        maxHeight: '90vh',
      },
      contentStyle: {
        paddingTop: '4px',
      },
      data: product,
    });

    this.ref.onClose.subscribe((data: Product) => {
      if (data) {
        if (type === 'add') {
          this.handleAddBook(data);
        }
        if (type === 'edit') {
          this.handleUpdateBook(product?.id, data);
        }
      }
    });
  }

  handleAddBook(data: Product) {
    this.bookService.createBook(data).subscribe({
      next: () => {
        this.msgService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Add book information successfully!',
        });
        this.getBooksList();
      },
    });
  }

  handleUpdateBook(id: string | undefined, data: Product) {
    this.bookService.updateBook(id, data).subscribe({
      next: () => {
        this.msgService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Update book information successfully!',
        });
        this.getBooksList();
      },
    });
  }

  handleOpenConfirmModal(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure to delete this book?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.bookService.deleteBook(id).subscribe({
          next: () => {
            this.msgService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Book deleted!',
            });
            this.getBooksList();
          },
        });
      },
    });
  }

  getBooksList() {
    this.bookService.getBooks().subscribe({
      next: (res) => {
        this.products = res;
      },
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}

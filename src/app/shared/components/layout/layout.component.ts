import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BookListComponent } from '../../../books/book-list/book-list.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, BookListComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}

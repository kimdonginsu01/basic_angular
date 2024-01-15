import { Component } from '@angular/core';
import { FilterSidebarComponent } from '../../shared/components/filter-sidebar/filter-sidebar.component';
import { ImageModule } from 'primeng/image';
@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [FilterSidebarComponent, ImageModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {}

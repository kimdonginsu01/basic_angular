import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    DropdownModule,
    SliderModule,
    MultiSelectModule,
    RatingModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss',
})
export class FilterSidebarComponent {
  constructor() {}

  rating: number = 0;
  priceRange: number = 0;
  display: boolean = false;
  authors = [];
  genres = [];
  years = [];

  ngOnInit() {
    this.authors = [
      // Populate with author options
    ];

    this.genres = [
      // Populate with genre options
    ];

    this.years = [
      // Populate with year options
    ];
  }
}

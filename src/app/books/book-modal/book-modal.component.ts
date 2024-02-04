import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { Product } from '../shared/models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    ReactiveFormsModule,
    RatingModule,
    InputTextareaModule,
  ],
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.scss',
})
export class BookModalComponent {
  constructor(
    private formBuilder: FormBuilder,
    private dialogConfig: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}
  @Input() data: Product = {};
  @Output() closeEmit: EventEmitter<boolean> = new EventEmitter();

  bookForm = this.formBuilder.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(1)]],
    category: ['', Validators.required],
    quantity: [0, [Validators.required, Validators.min(1)]],
    inventoryStatus: ['', Validators.required],
    rating: [0],
  });
  inventoryStatusOptions = [
    { label: 'INSTOCK', value: 'INSTOCK' },
    { label: 'LOWSTOCK', value: 'LOWSTOCK' },
    { label: 'OUTOFSTOCK', value: 'OUTOFSTOCK' },
  ];

  ngOnInit() {
    if (this.dialogConfig.data) {
      this.setFormValue(this.dialogConfig.data);
    }
  }

  setFormValue(data: Product) {
    this.bookForm.patchValue({
      code: data?.code,
      name: data?.name,
      description: data?.description,
      price: data?.price,
      category: data?.category,
      quantity: data?.quantity,
      inventoryStatus: data?.inventoryStatus,
      rating: data?.rating,
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.ref.close(this.bookForm.value);
    } else {
      this.bookForm.markAllAsTouched();
    }
  }
}

import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { ProgressSpinner } from 'primeng/progressspinner';
import { OrderStore } from './order.store';

@Component({
  selector: 'app-orders.page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    CurrencyPipe,
    DatePipe,
    Card,
    ProgressSpinner,
    Button,
  ],
  templateUrl: './orders.page.html',
  styleUrl: './orders.page.scss',
})
export class OrdersPage {
  private fb = inject(FormBuilder);
  store = inject(OrderStore);

  form = this.fb.group({
    id: ['', [Validators.required]],
  });

  search() {
    if (this.form.invalid) return;

    const rawId = this.form.value.id;
    const id = Number(rawId);

    if (!Number.isFinite(id)) return;

    this.store.loadById(id);
  }
}


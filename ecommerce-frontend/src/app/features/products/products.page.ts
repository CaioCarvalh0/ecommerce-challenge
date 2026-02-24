import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ProductsStore } from './products.store';
import { CartStore } from '../cart/cart.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    Card,
    ProgressSpinner,
    Button
  ],
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss',
})
export class ProductsPage {
  store = inject(ProductsStore);
  cart = inject(CartStore);

  constructor() {
    this.store.load();
  }
}

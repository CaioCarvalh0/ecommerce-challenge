import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';
import { CartStore } from './cart.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart.page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CurrencyPipe,
    FormsModule,
    Card,
    InputNumber,
    Button
  ],
  templateUrl: './cart.page.html',
  styleUrl: './cart.page.scss',
})
export class CartPage {
  cart = inject(CartStore);
  router = inject(Router);

  goCheckout() {
    this.router.navigate(['/checkout']);
  }
}

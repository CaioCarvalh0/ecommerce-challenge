import { Component, inject } from '@angular/core';
import { OrderStore } from './order.store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-order-confirmation.page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CurrencyPipe,
    DatePipe, 
    Card,
    ProgressSpinner,
    Button
  ],
  templateUrl: './order-confirmation.page.html',
  styleUrl: './order-confirmation.page.scss',
})
export class OrderConfirmationPage {
  store = inject(OrderStore);
  route = inject(ActivatedRoute);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isFinite(id)) this.store.loadById(id);
  }
}

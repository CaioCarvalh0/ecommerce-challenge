import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartStore } from '../cart/cart.store';
import { OrderStore } from '../order/order.store';
import { PaymentMethod } from '../../core/models/order.model';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-checkout.page',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    ReactiveFormsModule, 
    Button, 
    Card, 
    InputText
  ],
  templateUrl: './checkout.page.html',
  styleUrl: './checkout.page.scss',
})
export class CheckoutPage {
  private fb = inject(FormBuilder);
  cart = inject(CartStore);
  order = inject(OrderStore);
  router = inject(Router);

  paymentOptions: { label: string; value: PaymentMethod }[] = [
    { label: 'Pix', value: 'PIX' },
    { label: 'Card', value: 'CARTAO' },
    { label: 'Boleto', value: 'BOLETO' },
  ];

  form = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    endereco: ['', [Validators.required]],
    formaPagamento: ['PIX' as PaymentMethod, [Validators.required]],
  });

  submit() {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.getRawValue(),
      produtos: this.cart.items().map(i => ({ productId: i.productId, quantidade: i.quantidade }))
    };

    this.order.create(payload as any, (id) => {
      this.cart.clear();
      this.router.navigate(['/order', id]);
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from './api.config';
import { Product } from '../models/product.model';
import { CreateOrderRequest, CreateOrderResponse, OrderDetailsResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl;

  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  createOrder(payload: CreateOrderRequest) {
    return this.http.post<CreateOrderResponse>(`${this.baseUrl}/orders`, payload);
  }

  getOrder(id: number) {
    return this.http.get<OrderDetailsResponse>(`${this.baseUrl}/orders/${id}`);
  }
}

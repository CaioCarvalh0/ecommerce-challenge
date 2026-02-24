export type PaymentMethod = 'PIX' | 'CARTAO' | 'BOLETO';

export interface CreateOrderItemRequest {
  productId: number;
  quantidade: number;
}

export interface CreateOrderRequest {
  nome: string;
  email: string;
  endereco: string;
  formaPagamento: PaymentMethod;
  produtos: CreateOrderItemRequest[];
}

export interface CreateOrderResponse {
  numeroPedido: number;
}

export interface OrderItemResponse {
  productId: number;
  nome: string;
  precoUnitario: number;
  quantidade: number;
  subtotal: number;
}

export interface OrderDetailsResponse {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  formaPagamento: PaymentMethod;
  total: number;
  criadoEm: string;
  itens: OrderItemResponse[];
}
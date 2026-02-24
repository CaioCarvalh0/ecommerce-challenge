import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'products' },

    {
        path: 'products',
        loadComponent: () => import('./features/products/products.page').then(m => m.ProductsPage),
    },
    {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart.page').then(m => m.CartPage),
    },
    {
        path: 'checkout',
        loadComponent: () => import('./features/checkout/checkout.page').then(m => m.CheckoutPage),
    },
    {
        path: 'orders',
        loadComponent: () => import('./features/order/orders.page').then(m => m.OrdersPage),
    },
    {
        path: 'order/:id',
        loadComponent: () => import('./features/order/order-confirmation.page').then(m => m.OrderConfirmationPage),
    },

    { path: '**', redirectTo: 'products' },
];
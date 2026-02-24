import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { ApiService } from '../../core/api/api.service';
import { CreateOrderRequest, OrderDetailsResponse } from '../../core/models/order.model';
import { finalize } from 'rxjs/operators';

type OrderState = {
  creating: boolean;
  loading: boolean;
  lastOrderId: number | null;
  order: OrderDetailsResponse | null;
  error: string | null;
};

const initialState: OrderState = {
  creating: false,
  loading: false,
  lastOrderId: null,
  order: null,
  error: null,
};

export const OrderStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const api = inject(ApiService);

    return {
      create: (payload: CreateOrderRequest, onSuccess: (id: number) => void) => {
        patchState(store, {
          creating: true,
          error: null,
        });

        api
          .createOrder(payload)
          .pipe(
            finalize(() =>
              patchState(store, {
                creating: false,
              }),
            ),
          )
          .subscribe({
            next: (res) => {
              patchState(store, {
                lastOrderId: res.numeroPedido,
              });
              onSuccess(res.numeroPedido);
            },
            error: () =>
              patchState(store, {
                error: 'Failed to create order',
              }),
          });
      },

      loadById: (id: number) => {
        patchState(store, {
          loading: true,
          error: null,
        });

        api
          .getOrder(id)
          .pipe(
            finalize(() =>
              patchState(store, {
                loading: false,
              }),
            ),
          )
          .subscribe({
            next: (order: OrderDetailsResponse) =>
              patchState(store, {
                order,
              }),
            error: () =>
              patchState(store, {
                error: 'Failed to load order',
              }),
          });
      },
    };
  }),
);
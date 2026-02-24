import { inject, computed } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { ApiService } from '../../core/api/api.service';
import { Product } from '../../core/models/product.model';
import { finalize } from 'rxjs/operators';

type ProductsState = {
  loading: boolean;
  products: Product[];
  error: string | null;
};

const initialState: ProductsState = {
  loading: false,
  products: [],
  error: null,
};

export const ProductsStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed((store) => ({
    hasError: computed(() => !!store.error()),
    hasProducts: computed(() => store.products().length > 0),
  })),

  withMethods((store) => {
    const api = inject(ApiService);

    return {
      load: () => {
        patchState(store, {
          loading: true,
          error: null,
        });

        api
          .getProducts()
          .pipe(
            finalize(() =>
              patchState(store, {
                loading: false,
              }),
            ),
          )
          .subscribe({
            next: (products: Product[]) =>
              patchState(store, {
                products,
              }),
            error: () =>
              patchState(store, {
                error: 'Failed to load products',
              }),
          });
      },
    };
  }),
);
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { Product } from '../../core/models/product.model';

export interface CartItem {
  productId: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem?: string | null;
}

type CartState = {
  items: CartItem[];
};

const STORAGE_KEY = 'cart-items';

const loadInitialItems = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as CartItem[];
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

const saveItems = (items: CartItem[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
  }
};

const initialState: CartState = {
  items: loadInitialItems(),
};

export const CartStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed(({ items }) => ({
    count: computed(() =>
      items().reduce((acc, i) => acc + i.quantidade, 0)
    ),
    total: computed(() =>
      items().reduce((acc, i) => acc + (i.preco * i.quantidade), 0)
    ),
    isEmpty: computed(() => items().length === 0),
  })),

  withMethods((store) => ({
    add: (p: Product) => {
      const items = store.items();

      const found = items.find((i: CartItem) => i.productId === p.id);

      const nextItems = found
        ? items.map((i: CartItem) =>
            i.productId === p.id
              ? { ...i, quantidade: i.quantidade + 1 }
              : i,
          )
        : [
            ...items,
            {
              productId: p.id,
              nome: p.nome,
              preco: p.precoReais,
              quantidade: 1,
              imagem: p.imagem,
            },
          ];

      patchState(store, {
        items: nextItems,
      });
      saveItems(nextItems);
    },

    setQuantity: (productId: number, quantidade: number) => {
      const items = store.items();
      const nextItems = items.map((i: CartItem) =>
        i.productId === productId
          ? { ...i, quantidade: Math.max(1, quantidade) }
          : i,
      );

      patchState(store, {
        items: nextItems,
      });
      saveItems(nextItems);
    },

    remove: (productId: number) => {
      const items = store.items();
      const nextItems = items.filter((i: CartItem) => i.productId !== productId);

      patchState(store, {
        items: nextItems,
      });
      saveItems(nextItems);
    },

    clear: () => {
      patchState(store, { items: [] });
      saveItems([]);
    },
  }))
);
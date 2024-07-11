import { create } from 'zustand';

import { IBook } from '@/utils/types/books';

interface CartState {
  cart: IBook[];
  addItem: (book: IBook) => void;
  removeItem: (book: IBook) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()((set) => ({
  cart: JSON.parse(localStorage.getItem('cart') ?? '[]'),
  addItem: (book) =>
    set((state) => {
      const newState = [...state.cart, book];
      localStorage.setItem('cart', JSON.stringify(newState));
      return { cart: newState };
    }),
  removeItem: (book) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== book.id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { cart: newCart };
    }),
  clearCart: () =>
    set(() => {
      localStorage.removeItem('cart');
      return { cart: [] };
    }),
}));

export default useCartStore;

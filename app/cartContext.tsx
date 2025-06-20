import React, { createContext, useState, useCallback } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartProducts: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getTotal: () => number;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const CartContext = createContext<CartContextType>({
  cartProducts: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  getTotal: () => 0,
  products: [],
  setProducts: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCartProducts((prev) => {
      const found = prev.find((item) => item.product.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartProducts((prev) => prev.filter((item) => item.product.id !== id));
  }, []);

  const increaseQuantity = useCallback((id: number) => {
    setCartProducts((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((id: number) => {
    setCartProducts((prev) =>
      prev
        .map((item) =>
          item.product.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const getTotal = useCallback(() => {
    return cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartProducts]);

  return (
    <CartContext.Provider value={{ cartProducts, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, getTotal, products, setProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export type { CartContextType }; 
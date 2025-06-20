import React, { createContext, useState, useCallback } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  favoriteProducts: Product[];
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  favoriteProducts: [],
  products: [],
  setProducts: () => {},
});

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  }, []);

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, favoriteProducts, products, setProducts }}>
      {children}
    </FavoritesContext.Provider>
  );
}; 
export interface CartInfo {
  items: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  incrementItemQuantity: (itemId: string) => void;
  decrementItemQuantity: (itemId: string) => void;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Product {
  name: string;
  price: number;
  image: string;
  id: string;
  description: string;
}

export interface CatalogResults {
  data: Product[];
  paginationDetails: {
    nextCursor: number;
  };
}

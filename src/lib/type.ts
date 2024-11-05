import { z } from "zod";

export interface Product {
  name: string;
  price: number;
  image: string;
  id: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartInfo {
  items: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  incrementItemQuantity: (itemId: string) => void;
  decrementItemQuantity: (itemId: string) => void;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export interface CatalogResults {
  catalog: Product[];
  paginationDetails: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const signUpDetailsValidator = z
  .object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8, "at least 8 characters"),
    verifyPassword: z.string().min(8, "at least 8 characters"),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "Passwords do not match",
    path: ["verifyPassword"],
  });

export const logInDetailsValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const itemsValidator = z.object({
  name: z.string(),
  price: z.number(),
  image: z.string(),
  id: z.string(),
  description: z.string(),
  quantity: z.number(),
});

export const placeOrderValidator = z.array(itemsValidator);

export type signUpDetailsTypes = z.infer<typeof signUpDetailsValidator>;
export type logInDetailsTypes = z.infer<typeof logInDetailsValidator>;
export type placeOrderTypes = z.infer<typeof placeOrderValidator>;

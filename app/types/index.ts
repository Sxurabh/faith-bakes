export interface Product {
  id: string;
  name: string;
  category: 'cupcake' | 'cake' | 'cookie' | 'brownie';
  description: string;
  basePrice: number;
  image: string;
  sizes?: Size[];
  flavors?: string[];
  isCustomizable: boolean;
}

export interface Size {
  name: string;
  price: number;
  servings?: number;
}

export interface CustomizationOption {
  base: string[];
  flavor: string[];
  frosting: string[];
  toppings: string[];
  colors: string[];
}

export interface CustomizationState {
  base: string | null;
  flavor: string | null;
  frosting: string | null;
  toppings: string[];
  color: string | null;
}

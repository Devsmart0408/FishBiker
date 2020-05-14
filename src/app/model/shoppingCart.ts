import { Product } from './product';

export class ShoppingCart {
  Id: string;
  Products: CartProduct[];
  Total: number;
  Note: string;
  GrandTotal: number;
  Count: string;
}
export class CartProduct {
  Product: Product;
  Type: string;
  AttributeId: number;
  Count: number;
}

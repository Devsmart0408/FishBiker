import { Product } from './product';

export class ShoppingCart {
  Id: string;
  Products: Product[]
  Total: number;
  Note: string;
  GrandTotal: number;
  Count: string;
}

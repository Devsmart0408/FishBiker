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
  PricePerUnit: number;
  Attribute: string;
  CountryOfOriginId: string;
  DeliveryType: string;
  IsSpecialOffer: any;
  MSRP: number;
  MaximumUnitsOfOrder: number;
  MinimumUnitsOfOrder: number;
  Ranking: any;
  UnitsInStock: number;
}

export class Product {
  ProductId: number;
  ProductName: string;
  MeasurementUnit: string;
  ProductImage: string;
  ProductThumbnailImage: string;
  Attributes: Attribute[];
}

export class Attribute {
  Type: AttributeElement[];
  Size: AttributeElement[];
}

export class AttributeElement {
  AttributeId: number;
  Attribute: string;
  UnitsInStock: number;
  MSRP: number;
  PricePerUnit: number;
  Ranking: string;
  IsSpecialOffer: boolean;
  MinimumUnitsOfOrder: number;
  MaximumUnitsOfOrder: string;
  DeliveryType: string;
  CountryOfOriginId: string;
}

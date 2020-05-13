export class ProductCategory {
  CategoryId: number;
  CategoryName: string;
  CategoryDescriptions: string;
  CountOfProducts: number;
  CategoryImage: string;
  CategoryThumbnailImage: string;
  SubCategories : ProductCategory[]
}


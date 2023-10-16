export interface FindAllProductsDto {
  products: {
    id: string;
    name: string;
    descriptio: string;
    salesPrice: number;
  }[];
}

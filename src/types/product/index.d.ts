export interface IProductDetail {
  name: string;
  description?: string;
}

export interface IProduct extends IProductDetail {
  id: number;
}
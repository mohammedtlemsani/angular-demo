import {Product} from "./product.model";

export interface ProductState {
  products: Product[];
  keyword: string;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalProducts : number;
}

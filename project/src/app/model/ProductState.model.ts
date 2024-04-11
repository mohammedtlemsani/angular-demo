import {Product} from "./product.model";

export interface ProductState {
  errorMessage: any;
  products: Product[];
  keyword: string;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalProducts : number;
  status : string;
}

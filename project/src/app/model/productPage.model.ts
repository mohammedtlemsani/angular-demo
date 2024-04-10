import {Product} from "./product.model";

export interface ProductsPage {
  first: number
  prev: any
  next: number
  last: number
  pages: number
  items: number
  data: Product[]
}

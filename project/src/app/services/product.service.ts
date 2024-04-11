import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
import {ProductsPage} from "../model/productPage.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host:string = "http://localhost:8089/"
  constructor(private http:HttpClient) { }
  public getProducts(page:number =1,size:number =4){
    return this.http.get<ProductsPage>(this.host+"products?_page="+page+"&_per_page="+size)
  }
  public checkProduct(product:Product):Observable<Product>{
    return this.http.patch<Product>(this.host+`products/${product.id}`, {checked: !product.checked })
  }
  public deleteProduct(product:Product){
    return this.http.delete(this.host+"products/"+product.id)
  }

  saveProduct(product: Product) {
    return this.http.post<Product>(this.host+"products",product)
  }

  searchProduct(keyword: string) {
    return this.http.get<Array<Product>>(this.host+"products?name_like="+keyword);
  }

  getProductById(productId: number) {
    return this.http.get<Product>(this.host+"products/"+productId)
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(this.host+"products/"+product.id,product);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  public getProducts():Observable<Array<Product>>{
    return this.http.get<Array<any>>("http://localhost:8089/products")
  }
  public checkProduct(product:Product):Observable<Product>{
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`, {checked: !product.checked })
  }
  public deletProduct(product:Product){
    return this.http.delete("http://localhost:8089/products/"+product.id)
  }

  saveProduct(product: Product) {
    return this.http.post<Product>("http://localhost:8089/products",product)
  }

  searchProduct(keyword: string) {
    return this.http.get<Array<Product>>("http://localhost:8089/products?name_like="+keyword);
  }
}

import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";
import {ProductState} from "../model/ProductState.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public productState:ProductState = {
    products: [],
    keyword :"",
    pageSize :3,
    currentPage:1,
    totalPages: 0,
    totalProducts:0,
    status: "",
    errorMessage:""
  }
  constructor() { }
}

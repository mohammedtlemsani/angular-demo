import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";
import {ProductState} from "../model/ProductState.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public authState:any={
    username:undefined,
    roles:undefined,
    isAuthenticated:false,
    token:undefined
  }
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

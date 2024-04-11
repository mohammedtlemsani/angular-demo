import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  constructor(private ps:ProductService,private router:Router,public appState: AppStateService) {
  }


  ngOnInit(): void {
    this.getProducts(this.appState.productState.currentPage,this.appState.productState.pageSize);
  }

  getProducts(page:number=1,size:number=4){
    this.ps.getProducts(page,size).subscribe({

      next : resp => {
        this.appState.productState.products=resp.data as Product[]
        this.appState.productState.totalPages =resp.pages
        this.appState.productState.totalProducts=resp.items},
      error: err => console.log(err)
    })
  }

  handleCheckProduct(product: any) {
    console.log(product.id);

    this.ps.checkProduct(product).subscribe(
        (response) => {
          console.log('Product updated successfully:', response);
          product.checked = !product.checked;
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
  }

  handleDeleteProduct(product: Product) {
    this.ps.deleteProduct(product).subscribe({
      next: ()=>{
        this.getProducts();
      }
    })

  }

  searchProduct(keyword: string) {
    this.ps.getProducts().subscribe({
      next : value => {
        // @ts-ignore
        this.products = value.data.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase())) as Product[]
      }
    })

  }

  handleGoToPage(page: number) {
    this.appState.productState.currentPage=page
    this.getProducts(this.appState.productState.currentPage,this.appState.productState.pageSize);
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl("/editProduct/"+product.id);

  }
}

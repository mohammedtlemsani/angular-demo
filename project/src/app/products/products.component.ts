import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  public totalPages!: number;
  constructor(private ps:ProductService) {
  }
  public products :Array<Product>=[];
  public keyword: string="";
  public pageSize:number=3;
  public currentPage=1;

  ngOnInit(): void {
    this.getProducts(this.currentPage,this.pageSize);
  }

  getProducts(page:number=1,size:number=4){
    this.ps.getProducts(page,size).subscribe({

      next : resp => {
        this.products=resp.data as Product[]
        this.totalPages =resp.pages
        },
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
      next: value=>{
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
    this.currentPage=page
    this.getProducts(this.currentPage,this.pageSize);
  }
}

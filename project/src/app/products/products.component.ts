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
  constructor(private ps:ProductService) {
  }
  public products :Array<Product>=[];
  public keyword: string="";

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.ps.getProducts().subscribe({

      next : data => this.products=data,
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
    this.ps.deletProduct(product).subscribe({
      next: value=>{
        this.getProducts();
      }
    })

  }

  searchProduct(keyword: string) {
    this.ps.getProducts().subscribe({
      next : value => {
        this.products = value.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()))
      }
    })

  }
}

import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  constructor(private ps:ProductService) {
  }
  products :Array<any>=[];

  ngOnInit(): void {
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
}

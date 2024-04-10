import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  public productForm!:FormGroup;

  constructor(private fb : FormBuilder,private ps:ProductService) {
  }
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name : this.fb.control(''),
      price : this.fb.control(0),
      checked : this.fb.control(false)
    })
  }

  saveProduct() {
    let product:Product = this.productForm.value
    this.ps.saveProduct(product).subscribe({
      next:value => {
        this.productForm = this.fb.group({
          name : this.fb.control(''),
          price : this.fb.control(0),
          checked : this.fb.control(false)
        })
      }
    })
  }
}

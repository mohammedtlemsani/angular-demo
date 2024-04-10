import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  public productForm!: FormGroup;
  constructor(private route : ActivatedRoute,
              private ps:ProductService,
              private fb:FormBuilder){
  }
  public productId! : number;
  ngOnInit(): void {
    this.productId=this.route.snapshot.params["id"];
    this.ps.getProductById(this.productId).subscribe({
      next:value => {
        this.productForm = this.fb.group({
          id: this.fb.control(value.id),
          name : this.fb.control(value.name),
          price : this.fb.control(value.price),
          checked : this.fb.control(value.checked)
        }
        )
        console.log(this.productForm.value.name)
      }
    })
  }

  updateProduct() {
    let product:Product= this.productForm.value
    this.ps.updateProduct(product).subscribe({
      next :value => {
        alert(JSON.stringify(value.id)+"successfully updated")
      }
    })
  }
}

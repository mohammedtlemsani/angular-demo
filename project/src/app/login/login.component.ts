import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formLogin! : FormGroup;
  constructor(private fb:FormBuilder,private router:Router,public as:AuthService) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    })
  }

  protected readonly FormGroup = FormGroup;

  handleLogin() {
    let username = this.formLogin.value.username
    let password = this.formLogin.value.password
    this.as.login(username,password).then(resp=>{
      this.router.navigateByUrl("/admin/products")
    })
      .catch(err=>{
      })
    }
}

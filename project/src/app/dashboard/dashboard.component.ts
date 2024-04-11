import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {count} from "rxjs";
import {checkBudgets} from "@angular-devkit/build-angular/src/utils/bundle-calculator";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public appState:AppStateService) {
  }

  totalCheckedProducts() {
    let productsChecked = this.appState.productState.products.filter(p=>p.checked);
    return productsChecked.length
  }
}

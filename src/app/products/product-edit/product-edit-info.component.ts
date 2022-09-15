import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { Product, ProductResolved } from "../product";

@Component({
  templateUrl: "./product-edit-info.component.html",
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm) productForm?: NgForm;

  errorMessage: String | undefined = "";
  product: Product | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.data.subscribe((data) => {
      const resolvedData: ProductResolved = data["resolvedData"];
      this.errorMessage = resolvedData.error;
      this.product = resolvedData.product;
      // If we are on the edit page with invalid input field and then decide to go to Add Product page input field will still remain invalid.
      // To fix that issue we reset the form validation state on route param change.
      this.productForm?.reset();
    });
  }
}

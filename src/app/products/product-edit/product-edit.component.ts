import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { MessageService } from "../../messages/message.service";

import { Product, ProductResolved } from "../product";
import { ProductService } from "../product.service";

@Component({
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"],
})
export class ProductEditComponent implements OnInit {
  pageTitle = "Product Edit";
  errorMessage = "";

  product: Product | null = null;
  // We define a property called dataIsValid and set its type to be a set of key-value pairs where the key is the tab path name
  //  and the value is true for valid and false for invalid.
  private dataIsValid: { [key: string]: boolean } = {};

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // No need to have this anymore, we use resolvers to fetch the data.
    // this.route.paramMap.subscribe((params) => {
    //   console.log(params);
    //   const id = params.get("id");
    //   this.getProduct(Number(id));
    // });

    this.route.data.subscribe((data) => {
      const resolvedData: ProductResolved = data["resolvedData"];
      this.errorMessage = resolvedData.error ?? "";
      this.onProductRetrieved(resolvedData.product);
    });
  }

  // No need to have this anymore, we use resolvers to fetch the data.
  // getProduct(id: number): void {
  //   this.productService.getProduct(id).subscribe({
  //     next: (product) => this.onProductRetrieved(product),
  //     error: (err) => (this.errorMessage = err),
  //   });
  // }

  onProductRetrieved(product: Product | null): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = "No product found";
    } else {
      if (this.product.id === 0) {
        this.pageTitle = "Add Product";
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (!this.product || !this.product.id) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product?.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () =>
            this.onSaveComplete(`${this.product?.productName} was deleted`),
          error: (err) => (this.errorMessage = err),
        });
      }
    }
  }

  saveProduct(): void {
    if (this.product) {
      if (this.isValid()) {
        if (this.product.id === 0) {
          this.productService.createProduct(this.product).subscribe({
            next: () =>
              this.onSaveComplete(
                `The new ${this.product?.productName} was saved`
              ),
            error: (err) => (this.errorMessage = err),
          });
        } else {
          this.productService.updateProduct(this.product).subscribe({
            next: () =>
              this.onSaveComplete(
                `The updated ${this.product?.productName} was saved`
              ),
            error: (err) => (this.errorMessage = err),
          });
        }
      }
    } else {
      this.errorMessage = "Please correct the validation errors.";
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the product list
    this.router.navigate(["/products"]);
  }

  // This method takes in the path of the tab to check.
  // Gets called when any of the inputs change.
  isValid(path?: string): boolean {
    this.validate();

    // If checking a specific tab it returns the result from the validation data structure for that tab
    if (path) {
      return this.dataIsValid[path];
    }

    // Otherwise it checks every entry in the dataIsValid data structure and returns true only if the validation of all tabs is true.
    return (
      this.dataIsValid &&
      Object.keys(this.dataIsValid).every((d) => this.dataIsValid[d] === true)
    );
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // Here we are validating product data, not the form input elements, to perform our manual validation.
    // Recall that the ActivatedRoute service data property gives us a reference to the product instance, so any changes to the product
    //  instance made on any of the tabs is reflected in the parent components instance as well.

    // 'info' tab
    if (
      this.product?.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode
    ) {
      this.dataIsValid["info"] = true;
    } else {
      this.dataIsValid["info"] = false;
    }

    // 'tags' tab
    if (this.product?.category && this.product.category.length >= 3) {
      this.dataIsValid["tags"] = true;
    } else {
      this.dataIsValid["tags"] = false;
    }
  }
}

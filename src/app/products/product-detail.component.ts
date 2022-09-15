import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Product, ProductResolved } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  pageTitle = "Product Detail";
  product: Product | null = null;
  errorMessage = "";

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // No need to have this anymore, we use resolvers to fetch the data.
    // const id = this.route.snapshot.paramMap.get("id");
    // this.getProduct(Number(id));

    const resolvedData: ProductResolved =
      this.route.snapshot.data["resolvedData"];

    this.errorMessage = resolvedData.error ?? "";
    this.onProductRetrieved(resolvedData.product);
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

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = "No product found";
    }
  }
}

import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { Product, ProductResolved } from "./product";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: "root",
})
export class ProductResolver implements Resolve<ProductResolved> {
  // You can call other services inside resolvers
  constructor(private productService: ProductService) {}

  // This ProductResolver service can be used any time we want to pre-fetch a single product where the id for
  // that product is provided as an id parameter on the route

  // When the route is activated the router calls this method and waits for the observable to complete before activating the associated component.
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductResolved> {
    const id = route.paramMap.get("id");

    // Handle invalid id. Here we check if id is not a number. If it is not - return.
    if (isNaN(Number(id))) {
      const message = `Product id was not a number: ${id}`;
      console.log(message);

      // * What to do if there is an error:
      //    - Return false from the resolver. That would cancel the route leaving the user on the prior route.
      //        No way to tell the user why, and the app will just look broken.
      //    - We could return a null product and continue hoping that resolved route can handle a null product.
      //        No way to tell the user why the product is null and again the app looks broken.
      //    - We could navigate to an error page.
      //        No way of to pass a massage indicating what the error is.
      //    - Note that there is no built-in resolver mechanism for passing error messages out of a route resolver to the prior or activated route.
      //    - One possible solution is to create new ProductResolved interface which will contain:
      //        - product field of type Product
      //        - error field of type any
      //    - product.ts:
      //       ------------------------------------
      /*       |export interface ProductResolved {
      /        |    product: Product | null;
      /        |    error?: string;
      /        |}
      */
      //    - Now pass ProductResolved interface as generic parameter to Resolve interface and to resolve method.
      //    - This way our resolver will return the structure we defined instead of just a Product.
      return of({ product: null, error: message });
    }

    // Notice that we don't subscribe here. The resolver manages the subscription for us
    // and does not continue until the data is returned and the subscription is complete.
    return this.productService.getProduct(Number(id)).pipe(
      map((product) => ({ product: product })),
      catchError((error) => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({ product: null, error: message });
      })
    );
  }
}

import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ProductListComponent } from "./product-list.component";
import { ProductDetailComponent } from "./product-detail.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductEditInfoComponent } from "./product-edit/product-edit-info.component";
import { ProductEditTagsComponent } from "./product-edit/product-edit-tags.component";

import { SharedModule } from "../shared/shared.module";
import { ProductResolver } from "./product-resolver.service";

@NgModule({
  imports: [
    // Pulls in modules that can be shared across all of the feature modules.
    SharedModule,
    RouterModule.forChild([
      {
        // Since this parent route is component-less, the child component templates appear in the outlet one level above (in this case primary outlet).
        path: "products",
        children: [
          {
            path: "",
            component: ProductListComponent,
          },
          {
            path: ":id", // Instead of the full path name like before, we can now use relative paths, because now ProductDetailComponent is on the child route.
            component: ProductDetailComponent,
            resolve: {
              resolvedData: ProductResolver,
            },
          },
          {
            path: ":id/edit", // Instead of the full path name like before, we can now use relative paths, because now ProductEditComponent is on the child route.
            component: ProductEditComponent,
            resolve: {
              resolvedData: ProductResolver,
            },
            children: [
              {
                path: "",
                redirectTo: "info",
                pathMatch: "full",
              },
              {
                path: "info",
                component: ProductEditInfoComponent,
              },
              {
                path: "tags",
                component: ProductEditTagsComponent,
              },
            ],
          },
        ],
      },
    ]),
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
  ],
})
export class ProductModule {}

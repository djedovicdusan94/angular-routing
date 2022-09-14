import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { ProductData } from "./products/product-data";

import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./home/welcome.component";
import { PageNotFoundComponent } from "./page-not-found.component";

/* Feature Modules */
import { ProductModule } from "./products/product.module";
import { UserModule } from "./user/user.module";
import { MessageModule } from "./messages/message.module";

// Angular router is an external Angular module called RouterModule.
// RouterModule provides:
// - Router service to manage navigation and url manipulation,
// - Configuration for configuring routes,
// - Directives for activating and displaying routes:
//  - RouterLink
//  - RouterLinkActive
//  - RouterOutlet
// There can only ever be one active router service. That is because the router service deals with globally shared resource - the url location.
// To ensure there is always one active router service even if multiple RouterModule-s are imported across application RouterModule provides two methods:
// - forRoot:
//  - Declares the router directives,
//  - Manages our route configuration,
//  - Registers the router service,
//  - Used only once for the whole application
// - forChild:
//  - Declares the router directives,
//  - Manages our route configuration,
//  - Does NOT register the router service again,
//  - Used in feature modules

@NgModule({
  imports: [
    // Root AppModule is also importing BrowserModule to pull basic directives such as NgIf, NgFor.
    BrowserModule,
    // HttpClientModule is here so we could access HTTP client services and get/save data.
    HttpClientModule,
    // InMemoryWebApiModule is used to simulate calls to backend web service to get/save data without the need to set up real backend server.
    // For more information on this go to https://github.com/angular/angular/tree/main/packages/misc/angular-in-memory-web-api
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    // Feature module
    ProductModule,
    // Feature module
    UserModule,
    // Feature module
    MessageModule,
    // forRoot takes in an array that defines our route configuration.
    // Since we imported RouterModule in this Angular module the routing directives defined in RouterModule are accessible
    // to any components, directives or pipes declared in this Angular module.
    // And also since we called forRoot method the router service provided by router module is registered and available to the entire application.
    RouterModule.forRoot([]),
  ],
  declarations: [AppComponent, WelcomeComponent, PageNotFoundComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

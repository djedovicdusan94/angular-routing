import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
// RouterModule is commented because we are already exporting RouterModule from the AppRoutingModule.
// You only need this if you want to write all of your route definition here in the AppModule directly.
// import { RouterModule } from "@angular/router";

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

// Routing modules
import { AppRoutingModule } from "./products/app-routing.module";

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
    //  to any components, directives or pipes declared in this Angular module.
    // And also since we called forRoot method the router service provided by router module is registered and available to the entire application.

    // If you don't want to use routing modules to separate route definition you can define routes directly in here:
    // RouterModule.forRoot([
    //   // Tips:
    //   //  - Casing matters
    //   //  - No leading slash
    //   //  - Order matters. Router will pick the first route with a path that matches the url segments.
    //   { path: "welcome", component: WelcomeComponent },
    //   {
    //     path: "",
    //     redirectTo: "welcome",
    //     pathMatch: "full",
    //   },
    //   // This is the wildcard path.
    //   // In case the requested url segments don't match any prior paths defined in configuration we will show PageNotFoundComponent.
    //   { path: "**", component: PageNotFoundComponent },
    // ]),
    // If you want to use routing module (like we did here):
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    // This comes from external AppRoutingModule
    // WelcomeComponent,
    // This comes from external AppRoutingModule
    // PageNotFoundComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Things which Angular router can handle:
//  - Menu option, link, image or button that activates a route.
//  - Typing the url in the address bar, clicking on a bookmark.
//  - The browser's forward or back buttons.

// Url rewriting:
//  - HTML 5 style urls (/welcome):
//      When using client-side applications like Angular which might already be deployed on some production servers, there is often an issue where
//        application might break when refreshed on non root route, or when accessed from a bookmark. This problems can be solved by configuring
//        server to rewrite any in app url segments it receives to index.html so the app is properly loaded. The app then processes the original url
//        and routes to the desired page. How url rewriting is done depends on the web server so that is something that should be investigated further.
//  - Hash based urls (/#/welcome):
//      Key benefit here is that they don't require url rewriting because the server ignores everything after the hash.
//      To use hash style urls we pass an object into the forRoot like RouterModule.forRoot([...], { useHash: true })

// Activating a route:
//  - We use routerLink element to associate visual elements with route paths.
//  - routerLink is an attribute directive so we add it to a clickable element, such as a button, image or anchor tag.
//  - We bind routerLink directive to a template expression that returns a link parameters array. Since this is an array we need square brackets.
//  - First element of this array is the root of parent url segment. Be sure to include a slash before the segment! Path casing is important!
//  - Additional elements can be added to this array to specify route parameters or additional route segments.
// <a [routerLink]="['/welcome']">Home</a>
// <a [routerLink]="['/products']">Products</a>
// Since this particular arrays only contains simple string elements we could use the shortcut syntax and assign the routerLink to a simple string:
// <a routerLink="/welcome">Home</a>
// <a routerLink="/products">Products</a

// Activating a route with code:
//  - To route with code, we use Angular's router service.
//  - First we import Router - import { Router } from "@angular/router"
//  - Then we define a dependency on the router service using a constructor - constructor(private router: Router) { }
//  - Angular's dependency injector will inject the router instance into a component.
//  - Finally programmatic navigation can be done with - this.router.navigate(["/welcome"]);
//  - When the link parameters array contains static string we can use a shortcut syntax just as we did with routerLink - this.router.navigate("/welcome");
//  - When you want to ensure that every existing parameter or secondary route is removed use - this.router.navigateByUrl("/welcome"); This is often used
//      when logging out from the application.

// Feature module:
//  - An Angular module created with the express purpose of organizing the components for a specific application feature area.
//  - They allow us to keep the code more organized and also to implement lazy loading for all of the routes for a particular feature area.

// Shared module:
//  - Pulls in modules that can be shared across all of the feature modules.

// Route merging and order of route execution:
//  - Angular router will merge all the routes defined in the AppModule with routes from the feature modules (ProductModule, UserModule).
//  - This way application will always have access to all of the routes.
//    When app is compiled, final merged route configuration should look something like this: products, login, welcome, '', **
//      Any route definitions that are explicitly configured in a root app module (such as the routes we can see in AppRoutingModule) should be processed
//        last after any imported modules (ProductModule, UserModule).
//      Only if your module imports are declared in a proper way route path matching will be executed correctly. In this case AppRoutingModule import
//        should come after ProductModule and UserModule because we want wildcard route (**) which comes from AppRoutingModule
//        to not cut/interfere with routes from ProductModule/UserModule.

// Why define a routing module?
//  - Better code organization.
//  - Separation of concerns.

// Route path best naming conventions:
//  - ProductList -> products
//  - ProductDetail -> products/:id
//  - ProductEdit -> products/:id/edit
// As we can see in the examples above, always try to find common route path name which will clearly express the relationship between these features.

// Additional tips:
// Components which are rendered by using <router-outlet> do not need to have a selector property because they will only get rendered by a router.

// Most of this docs is based on https://app.pluralsight.com/library/courses/angular-routing/table-of-contents

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

// * Things which Angular router can handle:
//  - Menu option, link, image or button that activates a route.
//  - Typing the url in the address bar, clicking on a bookmark.
//  - The browser's forward or back buttons.

// * Url rewriting:
//  - HTML 5 style urls (/welcome):
//      When using client-side applications like Angular which might already be deployed on some production servers, there is often an issue where
//        application might break when refreshed on non root route, or when accessed from a bookmark. This problems can be solved by configuring
//        server to rewrite any in app url segments it receives to index.html so the app is properly loaded. The app then processes the original url
//        and routes to the desired page. How url rewriting is done depends on the web server so that is something that should be investigated further.
//  - Hash based urls (/#/welcome):
//      Key benefit here is that they don't require url rewriting because the server ignores everything after the hash.
//      To use hash style urls we pass an object into the forRoot like RouterModule.forRoot([...], { useHash: true })

// * Activating a route:
//  - We use routerLink element to associate visual elements with route paths.
//  - routerLink is an attribute directive so we add it to a clickable element, such as a button, image or anchor tag.
//  - We bind routerLink directive to a template expression that returns a link parameters array. Since this is an array we need square brackets.
//  - First element of this array is the root of parent url segment. Be sure to include a slash before the segment! Path casing is important!
//  - Additional elements can be added to this array to specify route parameters or additional route segments.
//      <a [routerLink]="['/welcome']">Home</a>
//      <a [routerLink]="['/products']">Products</a>
//      <a [routerLink]="['/products', product.id]">Product</a>
//      <a [routerLink]="['/products', product.id, 'edit']">Edit</a>
//      <a [routerLink]="['/products', 0, 'edit']">Create</a> -> Nice way to check if current route should create new product instead of edit it.
//  - Since this particular arrays only contains simple string elements we could use the shortcut syntax and assign the routerLink to a simple string:
//      <a routerLink="/welcome">Home</a>
//      <a routerLink="/products">Products</a

// * Activating a route with code:
//  - To route with code, we use Angular's router service.
//  - First we import Router - import { Router } from "@angular/router"
//  - Then we define a dependency on the router service using a constructor - constructor(private router: Router) { }
//  - Angular's dependency injector will inject the router instance into a component.
//  - Finally programmatic navigation can be done with:
//      this.router.navigate(["/welcome"]);
//      this.router.navigate(["/products", this.product.id]);
//  - When the link parameters array contains static string we can use a shortcut syntax just as we did with routerLink:
//      this.router.navigate("/welcome");
//  - When you want to ensure that every existing parameter or secondary route is removed use:
//      this.router.navigateByUrl("/welcome"); - This is often used when logging out from the application.

// * Feature module:
//  - An Angular module created with the express purpose of organizing the components for a specific application feature area.
//  - They allow us to keep the code more organized and also to implement lazy loading for all of the routes for a particular feature area.

// * Shared module:
//  - Pulls in modules that can be shared across all of the feature modules.

// * Route merging and order of route execution:
//  - Angular router will merge all the routes defined in the AppModule with routes from the feature modules (ProductModule, UserModule).
//  - This way application will always have access to all of the routes.
//  - When app is compiled, final merged route configuration should look something like this: products, login, welcome, '', **
//      Any route definitions that are explicitly configured in a root app module (such as the routes we can see in AppRoutingModule) should be processed
//        last after any imported modules (ProductModule, UserModule).
//      Only if your module imports are declared in a proper way route path matching will be executed correctly. In this case AppRoutingModule import
//        should come after ProductModule and UserModule because we want wildcard route (**) which comes from AppRoutingModule
//        to not cut/interfere with routes from ProductModule/UserModule.

// * Why define a routing module?
//  - Better code organization.
//  - Separation of concerns.

// * Route path best naming conventions:
//  - ProductList -> products
//  - ProductDetail -> products/:id
//  - ProductEdit -> products/:id/edit
// As we can see in the examples above, always try to find common route path name which will clearly express the relationship between these features.

// * Additional tips / interesting facts:
// Components which are rendered by using <router-outlet> do not need to have a selector property because they will only get rendered by a router.
// ActivatedRoute class contains a property snapshot: ActivatedRouteSnapshot . ActivatedRouteSnapshot is used in resolvers instead of ActivatedRoute class.

// * Providing data with a route:
//  - Via required route parameters
//  - Via optional route parameters
//  - Via Query parameters
//  - Via route's data property
//  - Via route resolver
//  - Via Angular service

// * Route parameters:
//  - One component may have data that another component need. We can swiftly pass that data as we route from one component to the next using route parameters.
//  - Best used for passing small amount of data, like ids, keys, keywords, etc..
//  - The router extracts any route parameters from the url and supplies them to the component trough the ActivatedRoute service.
//  - ActivatedRoute is one stop shop for route information. It provides access to:
//      Set of url segments
//      Route parameters
//      Query parameters
//      Route data
//      And many more!
//  - Any components instantiated by the router can inject ActivatedRoute service.
//  - Once injected there are two basic ways to use ActivatedRoute service to read route parameters:
//    - Via snapshot:
//        Provides initial state of the route, including the initial value of the route parameters:
//          const id = this.route.snapshot.paramMap.get("id");
//    - Via observable:
//        The observable keeps a watch on the parameters and receives a notification every time the parameters change:
//          this.route.paramMap.subscribe(params => { const id = params.get("id") });
//    - Difference between reading route parameters via snapshot vs observable:
//        Imagine that the user is on the following route - localhost:4200/products/5/edit. This route represents some edit product route.
//          Suddenly user navigates to the add product route on localhost:4200/products/0/edit. Route parameter would change
//            in the url from /products/5/edit (edit product) to /products/0/edit (create product) but edit form would still not change for entry of a new product.
//          Remember that if only parameters of the url change, like in this case from id=5 (edit product) to id=0 (create product) the component will
//            not get initialized again and ngOnInit will not be executed.
//          So how do we handle a change in parameters? Well instead of reading a route parameters via snapshot syntax we watch for parameter changes using observable.
//             ------------------------------------------------
/*             |ngOnInit(): void {
/              |   this.route.paramMap.subscribe((params) => {
/              |   console.log(params);
/              |   const id = params.get("id");
/              |   this.getProduct(Number(id));
/              | });
/              |}
*/

// * Optional route parameters:
//  - Optional route parameters make it easier to pass optional or more complex information as part of the route.
//  - This optional configuration is not part of the route configuration and it is not involved in matching route paths for navigation.
//      This way adding more optional parameters over time will not affect the application routing.
//  - Optional parameters are defined in the link parameters array as a set of key-value pairs.
//  - Any optional parameters must come after any required parameters in the link parameters array.
//  - Here is the example, imagine that we pass this link parameters array from some filters page to product list page which will accept all of these optional parameters:
//      <a [routerLink]="['/products', { name: productName, code: productCode, startDate: availabilityStart, endDate: availabilityEnd }]">Apply filter</a>
//      Link parameters array above will generate following url:
//        localhost:4200/products;name=Controller;code=gmg;startDate=March%201%2C%202018;endDate=March%201%2C%202019
//          In the url above we can se that keys and values are separated by semicolons. Spaces and comas are encoded.

// * Query parameters:
//  - Imagine that the user is on the product list page. He is working with some data table, he toggles and filters various table rows, columns, etc..
//      At some point user navigates to product details page to check for some additional info and after he is finished
//        he uses back button to go back to the product list page.
//      When he is back at the product list page user notices that all of his filtered data, selections, etc.. are all gone.
//      It would be a much nicer user experience if we retained the user settings when navigating to the product details page and return those settings
//        when the user navigates back to the product list page.
//      We can solve this by using query parameters. Just like optional parameters we use this to pass optional or complex information.
//      Unlike optional parameters, query parameters can be retained across routing paths but not by default.
//      Like optional parameters, query parameters are not part of route configuration and are not involved with matching route paths.
//      We populate required and optional route parameters by adding them to the link parameters array,
//        but in the case of query parameters we must pass them separately:
//          <a [routerLink]="['/products', product.id]" [queryParams]="{ filterBy: 'er', showImage: true }">{{ product.productName }}</a>
//      When navigating inside code we add a second argument to the navigate method:
//        this.router.navigate(['/products', product.id], { queryParams: { filterBy: 'er', showImage: true } } );
//      When you navigated to product details page using query parameters you will get something like: localhost:4200/products/5?filterBy=er&showImage=true
//      When navigating back from product details page to product list page url will not be retained by default..
//        When inside product details page you must add following to your back button to retain parameters and use them back in product details page:
//          <a [routerLink]="['/products']" queryParamsHandling="preserve">Back</a>
//          Or programmatically - this.router.navigate(["/products"], { queryParamsHandling: "preserve" });
//      Now we can ready back our query parameters inside product list page:
//        via snapshot syntax (note that parameters always come as strings):
//         |--------------------
//         |global properties:
//         |  listFilter = "";
//         |  showImage = false;
//         |--------------------
//         |ngOnInit:
//         |  this.listFilter = this.route.snapshot.queryParamMap.get("filterBy") || "" // We also handle the case where filterBy is undefined (initial component render).
//         |  this.showImage = this.route.snapshot.queryParamMap.get("showImage") === "true" // Returns true, otherwise defaults to false which is set initially.

// * Providing data with a route (data property):
//  - A route definition also has a data property. We use it to provide any arbitrary data to a route. This is also used to get the data from the resolvers.
//      data property is passed as object which contains key-value pairs.
//      Data defined in the data property cannot change throughout a lifetime of the application so we often use it for displaying static data.
//      To read data property we use the ActivatedRoute service:
//        RouterModule.forChild([ { path: "products", component: ProductComponent, data: { pageTitle: "ProductList" } } ])
//        this.pageTitle = this.route.snapshot.data["pageTitle"];

// * Route resolvers:
//  - Enables data prefetching.
//  - Improves flow when an error occurs.
//  - Prevents display of a partial page while waiting for data to be retrieved. Resolver can get the data first and then route to the component.
//  - Without route resolver component class gets the data after class has already been initialized. With route resolver, the resolver service gets the data,
//      so the template is not displayed until it has the data it needs. This provides much better visual appearance and nicer user experience.
//  - Steps for implementing resolvers inside application:
//    - Build a route resolver service.
//    - Add resolve to the route definition.
//    - When the route gets the data that our component needs, modify the associated component to
//        read its data from the ActivatedRoute service (similar to reading data from route parameters).
//  - Resolver is regular class which you create and implement Resolve interface to that class.
//  - When adding resolver to route definition know that you can add any number of resolvers for a single route.
//      Just be sure that each key inside of single resolve object is unique:
/*  --------------------------------------
/   |{
/   |   path: "products/:id",
/   |   component: ProductDetailComponent,
/   |   resolve: {
/   |     resolvedData: ProductResolver, // View more details about this resolver inside app/product/product-resolver.service.ts
/   |   },
/   |},
*/
//  - We can use the ActivatedRoute snapshot to read the resolver data. Simply access the data property of the snapshot referencing the desired element
//      using the name of the data we defined in the route configuration, or in this case:
//        Via snapshot: this.product = this.route.snapshot.data["resolvedData"].product; // .product only if you return object from the resolver.
//        Via observable: this.route.data.subscribe(data => this.product = data["resolvedData"].product); // .product only if you return object from the resolver.
//        To understand difference between 2 approaches read "Difference between reading route parameters via snapshot vs observable".
//  - Accessing the data array from the ActivatedRoute service gives us a reference to the data instance. All code that retrieves and works with the same
//      element from the data array shares the same instance. So any change made to this property in any one component is seen by all components that
//      reference the same property. This sharing of the data instance is useful when we are working with child routes as we will see later.

// * Child routes:
//  - Using child routes, we define a route hierarchy to better organize, encapsulate and navigate through our application.
//  - This also makes it easier to lazy load routes, improving the startup performance of the application. Note that child routes are required for lazy loading.
//
//                               App                                // Here we see two primary routes, Welcome and Products.
//                                |                                 // Products route is a componentless route meaning it does not activate a component but rather
//                  ______________|________________                 //   simply acts as a parent route allowing us to group the product routes as child routes.
//       /welcome   |                              | /products      // Product route has three children, Product List, Product Edit and Product Details.
//              ---------                    -----------            // Further down the line Product Edit has two children, Edit Info and Edit tags.
//              |Welcome|                    |_________|
//                                                |
//                                                |
//                              __________________|__________________
//                              |                 |                 |
//                            / |                 | /:id/edit       | /:id
//                       --------------    --------------   ----------------
//                       |Product List|    |Product Edit|   |Product Detail|
//                                                |
//                                                |
//                                       -------------------
//                                       |                 |
//                                 /info |                 | /tags
//                                  -----------       -----------
//                                  |Edit Info|       |Edit Tags|
//
//
// Key purpose of child routes is to define routes that are displayed within other routes, or more technically accurate, to display routed component template,
//  within other routed component templates.
/*   |----------------------------------------------
 /   | {
 /   |   path: "products/:id/edit",
 /   |   component: ProductEditComponent,
 /   |   resolve: {
 /   |     resolvedData: ProductResolver,
 /   |   },
 /   |   children: [
 /   |     {
 /   |       path: "",
 /   |       redirectTo: "info",
 /   |       pathMatch: "full",
 /   |     },
 /   |     {
 /   |       path: "info",
 /   |       component: ProductEditInfoComponent,
 /   |     },
 /   |     {
 /   |       path: "tags",
 /   |       component: ProductEditTagsComponent,
 /   |     },
 /   |   ],
 /   | },
*/
//  - As we can see in the example above, for each child route we first define the path. The first route is for the empty path and this defines
//      the default path to display if no child path has been specified.
//  - After the first child we have info path. We specify that ProductEditInfoComponent will be activated when the route is activated.
//      We also do the same thing for the tags path.
//  - To display a template for a child route within the parent's template, the parent's template must contain a router outlet directive.
//      That router outlet would then identify the location where the child's template is displayed within the paren't template.
//      The outlet for displaying child routes looks basically the same as the syntax for the primary outlet.
//  - Now when navigating to http://localhost:4200/products/2/edit , we will be redirected to the http://localhost:4200/products/2/edit/info.
//  - This will render the following:
/*      ----------------------------------------------------------------------------------------------------------------------------------
/       |<div class="card">
/       |
/       |  <div class="card-header"> // * Everything around router outlet comes from primary route /products/2/edit
/       |    {{ pageTitle }}         // *   and is part of the AppComponent's outlet.
/       |  </div>
/       |
/       |  <div class="card-body" *ngIf="product">
/       |    <div class="wizard">
/       |      <a [routerLink]="['info']"> Basic information </a> // Activating child routes with relative navigation.
/       |      <a [routerLink]="['tags']"> Search tags </a>
/       |    </div>
/       |
/       |    <router-outlet></router-outlet> // * This is the ProductEditComponent outlet which renders ProductEditInfoComponent and ProductEditTagsComponent
/       |                                    
/       |   </div>
/       |</div>
/       |
/       |<div class="alert alert-danger" *ngIf="errorMessage">{{ errorMessage }}</div>
*/
//  - There are two ways to activate a child route:
//    - With an absolute path (this way router will start from the top of the route configuration):
//        <a [routerLink]="['/products', products.id, 'edit', 'info']">Info</a>
//        Or from the component class: this.router.navigate(["/products", this.product.id, "edit", "info"]);
//    - With a relative path (often a better option). Relative path is relative to the current url segment:
//        <a [routerLink]="['info']">Info</a> // Leave out the slash!
//        Or from the component class: this.router.navigate(["info"], { relativeTo: this.route }); // Leave out the slash!

// * Obtaining data for a child route:
//  - There are several solutions for this:
//    - Child component can contact product data service:
//        this.productService.getProduct(id).subscribe(product => this.product = product);
//    - We can create resolvers for our child routes and then get the data from inside of the child component:
//        Via snapshot: this.product = this.route.snapshot.data["resolvedData"].product; // .product only if you return object from the resolver.
//        Via observable: this.route.data.subscribe(data => this.product = data["resolvedData"].product); // .product only if you return object from the resolver.
//    - If parent already has its own resolver and the child routes work with the same data we can instead use route resolver on the parent route:
//        Via snapshot: this.product = this.route.parent.snapshot.data["resolvedData"].product; // .product only if you return object from the resolver.
//        Via observable: this.route.parent.data.subscribe(data => this.product = data["resolvedData"].product); // .product only if you return object from the resolver.
//        Recall that this syntax provides a reference to the product data instance so our parent route and each child route with a reference
//          will share that instance.

// * Validating across child routes:
//  - Best pattern is to define a form in each child component, but perform manual validation.
//  - Since the save button is on the parent ProductEditComponent we will add the validation there.
//  - For more information on how to implement this please visit ProductEditComponent.

// * Grouping routes and component-less routes:
//  - Currently our products route configuration looks like this:
//     |-------------------------------------------------------------
//     |RouterModule.forChild([
//     |  { path: "products", component: ProductListComponent },
//     |  {
//     |    path: "products/:id",
//     |    component: ProductDetailComponent,
//     |    resolve: {
//     |      resolvedData: ProductResolver,
//     |    },
//     |  },
//     |  {
//     |    path: "products/:id/edit",
//     |    component: ProductEditComponent,
//     |    resolve: {
//     |      resolvedData: ProductResolver,
//     |    },
//     |    children: [
//     |      {
//     |        path: "",
//     |        redirectTo: "info",
//     |        pathMatch: "full",
//     |      },
//     |      {
//     |        path: "info",
//     |        component: ProductEditInfoComponent,
//     |      },
//     |      {
//     |        path: "tags",
//     |        component: ProductEditTagsComponent,
//     |      },
//     |    ],
//     |  },
//     |]),
//  - We could instead group our routes in such way that the ProductDetailComponent and ProductEditComponent are children of the component-less products route.
//  - Since child routes extend the path of the parent route we specify relative path, making our path names shorter and more durable as paths change over time.
//     |---------------------------------------------------------------------------------------------------------------------------------------------------------
//     |RouterModule.forChild([
//     |  {
//     |    // Since this parent route is component-less, the child component templates appear in the outlet one level above (in this case primary outlet).
//     |    path: "products",
//     |    children: [
//     |      {
//     |        path: "",
//     |        component: ProductListComponent,
//     |      },
//     |      {
//     |        path: ":id", // Instead of the full path name like before, we can now use relative paths, because now ProductDetailComponent is on the child route.
//     |        component: ProductDetailComponent,
//     |        resolve: {
//     |          resolvedData: ProductResolver,
//     |        },
//     |      },
//     |      {
//     |        path: ":id/edit", // Instead of the full path name like before, we can now use relative paths, because now ProductEditComponent is on the child route.
//     |        component: ProductEditComponent,
//     |        resolve: {
//     |          resolvedData: ProductResolver,
//     |        },
//     |        children: [
//     |          {
//     |            path: "",
//     |            redirectTo: "info",
//     |            pathMatch: "full",
//     |          },
//     |          {
//     |            path: "info",
//     |            component: ProductEditInfoComponent,
//     |          },
//     |          {
//     |            path: "tags",
//     |            component: ProductEditTagsComponent,
//     |          },
//     |        ],
//     |      },
//     |    ],
//     |  },
//     |]),

import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WelcomeComponent } from "../home/welcome.component";
import { PageNotFoundComponent } from "../page-not-found.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      // Tips:
      //  - Casing matters
      //  - No leading slash
      //  - Order matters. Router will pick the first route with a path that matches the url segments.
      { path: "welcome", component: WelcomeComponent },
      {
        path: "",
        redirectTo: "welcome",
        pathMatch: "full",
      },
      // This is the wildcard path.
      // In case the requested url segments don't match any prior paths defined in configuration we will show PageNotFoundComponent.
      { path: "**", component: PageNotFoundComponent },
    ]),
  ],
  exports: [
    // We export RouterModule because when AppModule imports our AppRoutingModule,
    // the components declared in AppModule will have access to all the router directives which come from RouterModule.
    RouterModule,
  ],
})
export class AppRoutingModule {}

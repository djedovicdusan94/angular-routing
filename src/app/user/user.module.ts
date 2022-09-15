import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LoginComponent } from "./login.component";

import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    // Pulls in modules that can be shared across all of the feature modules.
    SharedModule,
    RouterModule.forChild([{ path: "login", component: LoginComponent }]),
  ],
  declarations: [LoginComponent],
})
export class UserModule {}

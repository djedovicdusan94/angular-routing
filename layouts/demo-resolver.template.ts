import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DemoResolver implements Resolve<any> {
  // When the route is activated the router calls this method and waits for the observable to complete before activating the associated component.
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    throw new Error("Method not implemented.");
  }
}

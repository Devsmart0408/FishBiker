import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HeaderService } from '../services/header.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
      private router: Router,
      private headerService: HeaderService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      //if (this.headerService.tenant && this.headerService.tenant?.TenantId) {
      //      return true;
      //  }

        // not logged in so redirect to login page with the return url
      this.router.navigate(['http://nerdherd.me/']);
        return false;
    }
}

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';

/**
 * Guard checking if the user is connected to the application
 * @author Boenec Yann
 * @date 11/03/2019
 */
@Injectable({
  providedIn : 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Check if the user is logged into the application and redirect it into the login page if not
   * @param next Next route
   * @param state State of the router
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLogged()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

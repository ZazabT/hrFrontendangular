import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // Check if token exists in localStorage
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      // If token exists, allow access to the route (e.g., dashboard)
      return true;
    } else {
      // If token doesn't exist, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}

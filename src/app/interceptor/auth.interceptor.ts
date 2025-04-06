import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { switchMap, catchError } from 'rxjs/operators';

interface RefreshTokenResponse {
  accessToken: string; 
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = localStorage.getItem('accessToken');

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return next.handle(clonedRequest).pipe(
      catchError((error) => {
        if (error.status === 401 && accessToken) {
          return this.authService.refreshAccessToken().pipe(
            switchMap((data: RefreshTokenResponse) => { 
              localStorage.setItem('accessToken', data.accessToken);
              const clonedRetryRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${data.accessToken}`,
                },
              });
              return next.handle(clonedRetryRequest);
            })
          );
        }
        throw error;
      })
    );
  }
}

import { AuthService } from './auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injector } from '@angular/core';

/**
 * Response interceptor to handle all http status
 * @author Boenec Yann
 * @date 21/02/2019
 */
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private inj: Injector) {
  }

  /**
   * Implementation of HTTPInterceptor function
   * @param req Http request
   * @param next Http handler
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        event => {},
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 || error.status === 403) {
              this.inj.get(AuthService).logout();
              window.location.href = '/login';
            } else {
              // Error management
            }
          }
        }
      )
    );
  }
}

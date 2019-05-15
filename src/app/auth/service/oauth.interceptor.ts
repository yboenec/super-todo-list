import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Interceptor oauth to put access token into the header
 * @author Boenec Yann
 * @date 21/02/2019
 */
@Injectable()
export class OauthInterceptor implements HttpInterceptor {

    constructor() { }

    /**
     * Implementation of HTTPInterceptor function
     * @param req Http request
     * @param next Http handler
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (window.localStorage) {
            const token = window.localStorage.getItem('access_token');
            if (token) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        }
        return next.handle(req);
    }

}

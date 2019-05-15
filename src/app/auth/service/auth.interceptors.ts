import { Injector } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OauthInterceptor } from './oauth.interceptor';
import { ResponseInterceptor } from './response.interceptor';

/**
 * Authentication interceptors of the application
 * @author Boenec Yann
 * @date 21/02/2019
 */
export const INTERCEPTORS = [
    {provide: HTTP_INTERCEPTORS, useClass: OauthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true, deps: [Injector]}
];

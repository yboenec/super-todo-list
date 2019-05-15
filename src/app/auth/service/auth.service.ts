import { User } from './../model/auth';
import {environment} from '../../../environments/environment.prod';
import {Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {OauthResponse} from '../model/auth';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

/**
 * Authentication service
 * @author Boenec Yann
 * @date 21/02/2019
 */
@Injectable()
export class AuthService {

    private static ACCESS_TOKEN = 'access_token';
    private static REFRESH_TOKEN = 'refresh_token';
    private static EXPIRE_IN = 'expire_in';
    private static API_PROFILE_URL = '/api/user/me';
    private user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {
    }

    /**
     * Get the access token of the local storage. Return null is the access token is not into the local storage
     * @return Access token or null is the access token is not into the local storage
     */
    getAccessToken(): string {
      let token: string = null;
      if (window.localStorage) {
        token =  window.localStorage.getItem('access_token');
      }

      return token;
    }

    /**
     * Check if the current client is logged into the application
     * @return boolean about the connection information of the client
     */
    isLogged(): boolean {
      return this.getAccessToken() !== null && this.getAccessToken().length !== 0;
    }

    /**
     * Set tokens into the local storage.
     * @param data Oauth response of the authentication
     */
    setTokens(data: OauthResponse): void {
      if (window.localStorage) {
        window.localStorage.setItem(AuthService.ACCESS_TOKEN, data.access_token);
        window.localStorage.setItem(AuthService.REFRESH_TOKEN, data.refresh_token);
        window.localStorage.setItem(AuthService.EXPIRE_IN, `${data.expires_in}`);
        this.loadUser();
      }
    }
  /**
   * Login function to log user into the interface
   * @param username Username of the user
   * @param password Password of the user
   */
    login(username: string, password: string): Observable<OauthResponse> {
        if (window.localStorage) {
            window.localStorage.removeItem(AuthService.ACCESS_TOKEN);
            window.localStorage.removeItem(AuthService.REFRESH_TOKEN);
            window.localStorage.removeItem(AuthService.EXPIRE_IN);
        }
        const body = `grant_type=password&username=${username}&password=${password}`;
        const authorization = btoa(`${environment.oauth.clientId}:${environment.oauth.clientSecret}`);
        return this.http.post<OauthResponse>('/oauth/token', body, {
            headers: {
                Authorization: `Basic ${authorization}`,
                'Content-type': 'application/x-www-form-urlencoded'
            }
        });
    }

    /**
     * Remove all tokens in the local storage and redirect to the login page
     */
    logout(): void {
      if (window.localStorage) {
        window.localStorage.removeItem(AuthService.ACCESS_TOKEN);
        window.localStorage.removeItem(AuthService.REFRESH_TOKEN);
        window.localStorage.removeItem(AuthService.EXPIRE_IN);
      }
      this.router.navigate(['login']);
      this.user.next(null);
    }

    /**
     * Load the current connected User
     */
    loadUser(): void {
      this.http.get<User>(`${AuthService.API_PROFILE_URL}`).subscribe(res => {
        this.user.next(res);
      });
    }

    /**
     * Get the current connected user as an observable for subscription
     */
    getMe(): Observable<User> {
      if (this.getAccessToken() !== null && this.user.getValue() === null) {
        this.loadUser();
      }
      return this.user.asObservable();
    }
}

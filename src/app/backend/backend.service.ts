import { XhrFactory } from '@angular/common/http/src/xhr';
import { OauthResponse } from './../auth/model/auth';
import { HttpXhrBackend, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


/**
 * Mock XHR class using the default browser XHR.
 */
export class MockXhr implements XhrFactory {
  private xhr: XMLHttpRequest;
  build(): any {
    if (!this.xhr) {
      return new XMLHttpRequest();
    }
    return this.xhr;
  }
}

/**
 * Mock backend service extends from HttpXhrBackend. This class handle all request made by the client.
 * This mechanism can also be make with an interceptor
 */
@Injectable()
export class BackendService extends HttpXhrBackend {
  private factory: XhrFactory;

  constructor() {
    const factory = new MockXhr();
    super(factory);
    this.factory = factory;
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url.endsWith('/oauth/token')) {
      return this.handleLogin(req);
    } else if (req.method === 'GET' && req.url.endsWith('/todo/list')) {
      return this.handleTodoList(req);
    } else {
      return this.handleIcon(req);
    }
  }

  /**
   * Get the list of todos. XHR call is make to get the json file.
   */
  private handleTodoList(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const xhr = this.factory.build();
    xhr.open('GET', '/assets/todos.json', false);
    xhr.send(null);
    if (xhr.status === 200) {
      return of(new HttpResponse({body: JSON.parse(xhr.response), status: 200}));
    } else {
      return of(new HttpResponse({status: 404}));
    }
  }

  /**
   * Handle icon request
   */
  private handleIcon(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const xhr = this.factory.build();
    xhr.open(req.method, req.url, false);
    xhr.send(null);
    if (xhr.status === 200) {
      return of(new HttpResponse({body: xhr.responseText, status: 200}));
    } else {
      return of(new HttpResponse({status: 404}));
    }

  }

  /**
   * Handle login request
   */
  private handleLogin(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const oauthResponse: OauthResponse =  {
      access_token: '123',
      refresh_token: '123',
      expires_in: 123
    };

    return of(new HttpResponse({body: oauthResponse, status: 200}));
  }
}

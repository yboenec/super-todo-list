import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from './auth.service';
import {OauthResponse} from '../model/auth';

/**
 * Authentication service test
 */
describe('Authentication service', () => {
  let httpMock: HttpTestingController;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);
  });

  /**
   * Test http call get token
   */
  it('should get token', (done) => {
    const data = {access_token: 'value', refresh_token: 'value', expires_in: 100};

    service.login('username', 'password').subscribe(res => {
      expect(res).toBe(data);
      done();
    });

    const req = httpMock.expectOne('/oauth/token');
    expect(req.request.method).toBe('POST');
    req.flush(data);
  });

  /**
   * Test get the access token through the localstorage
   */
  it('should return the access token', (done) => {
    const response: OauthResponse = {access_token: 'value', refresh_token: 'value', expires_in: 100};
    service.setTokens(response);
    const token = service.getAccessToken();
    expect(token).toBe('value');
    done();
  });

  /**
   * Test logout user
   */
  it('should logout the user', (done) => {
    const response: OauthResponse = {access_token: 'value', refresh_token: 'value', expires_in: 100};
    service.setTokens(response);
    expect(service.isLogged()).toBeTruthy();
    service.logout();
    expect(service.isLogged()).toBeFalsy();
    done();
  });

  /**
   * Test logout user
   */
  it('should load the user', () => {
    const data = {firstName: 'First name', lastName: 'Last name'};

    service.loadUser();
    const req = httpMock.expectOne('/api/user/me');
    expect(req.request.method).toBe('GET');
    req.flush(data);
    service.getMe().subscribe(res => {
      expect(res).toBe(data);
    });
  });
});

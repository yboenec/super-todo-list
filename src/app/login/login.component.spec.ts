import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './../auth/service/auth.service';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { fillInput } from 'src/test/utils';
import { of } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Login component test
 */
describe('Login component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        AuthModule.forRoot(),
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        LoginComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should log in to the application', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const spyLogin = spyOn(fixture.debugElement.injector.get(AuthService), 'login').and.returnValue(of({access_token: '123',
      refresh_token: '123', expires_in: 123}));
    const spyNavigate = spyOn(fixture.debugElement.injector.get(Router), 'navigate');
    const username = fixture.debugElement.query(By.css('.username'));
    const password = fixture.debugElement.query(By.css('.password'));
    const submit = fixture.debugElement.query(By.css('.submit'));
    fillInput('username', username);
    fillInput('password', password, fixture);
    expect(submit.nativeElement.disabled).toBeFalsy();
    submit.nativeElement.click();
    fixture.detectChanges();
    expect(spyLogin).toHaveBeenCalled();
    expect(spyNavigate).toHaveBeenCalledWith(['/home']);
  });

});

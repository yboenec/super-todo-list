import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';

/**
 * Login module
 * @author Boenec Yann
 * @date 21/02/2019
 */
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }

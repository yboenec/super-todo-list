import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { INTERCEPTORS } from './service/auth.interceptors';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';

/**
 * Authentication module
 * @author Boenec Yann
 * @date 21/02/2019
 */
@NgModule({
  imports: [HttpClientModule]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: AuthModule,
        providers: [AuthService, INTERCEPTORS]
    };
  }
}

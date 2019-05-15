import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BackendService } from './backend.service';

/**
 * Backend module
 * @author Boenec Yann
 * @date 21/02/2019
 */
@NgModule({
  imports: [HttpClientModule]
})
export class BackendModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BackendModule,
      providers: [
        {provide: HttpXhrBackend, useClass: BackendService}
      ]
    };
  }

}

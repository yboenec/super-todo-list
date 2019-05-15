import { TodosService } from './todos/service/todos.service';
import { SharedModule } from './../shared/shared.module';
import { ListTodosComponent } from './todos/components/listtodos.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Home module
 * @author Boenec Yann
 * @date 21/02/2019
 */
@NgModule({
  declarations: [
    HomeComponent,
    ListTodosComponent
  ],
  providers: [
    TodosService
  ],
  imports: [
    HomeRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class HomeModule { }

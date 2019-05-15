import { TodosEffects } from './todos/service/todos.effects';
import { StoreModule } from '@ngrx/store';
import { TodosService } from './todos/service/todos.service';
import { SharedModule } from './../shared/shared.module';
import { ListTodosComponent } from './todos/components/listtodos.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { todoReducer } from './todos/service/todos.reducers';
import { EffectsModule } from '@ngrx/effects';

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
    SharedModule,
    StoreModule.forFeature('todo', todoReducer),
    EffectsModule.forFeature([TodosEffects])
  ]
})
export class HomeModule { }

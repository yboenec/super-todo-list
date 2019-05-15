import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';

import { Todo } from './../model/todo.interface';
import { ListTodoLoadedAction, ListTodoLoadingAction, ModifyTodoAction, TodoActions } from './todos.actions';
import { TodosService } from './todos.service';

@Injectable()
export class TodosEffects {

  constructor(private todoService: TodosService, private actions$: Actions) { }

  @Effect()
  listTodo$: Observable<ListTodoLoadingAction> = this.actions$.pipe(
    ofType(TodoActions.LIST_LOADING),
    switchMap(()  =>  this.todoService.list()),
    map((todos: Todo[]) => new ListTodoLoadedAction(todos))
  );
}

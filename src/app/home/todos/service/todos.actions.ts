import { Action } from '@ngrx/store';
import { Todo } from '../model/todo.interface';
import { Update } from '@ngrx/entity';

export enum TodoActions {
  ADD = 'Add todo',
  LIST_LOADING = 'List loading todo',
  LIST_LOADED = 'List loaded todo',
  MODIFY = 'Modify todo'
}

export class AddTodoAction implements Action {
  readonly type: string = TodoActions.ADD;

  constructor(public payload: Todo) {}
}

export class ListTodoLoadedAction implements Action {
  readonly type: string = TodoActions.LIST_LOADED;

  constructor(public payload: Todo[]) {
  }
}

export class ListTodoLoadingAction implements Action {
  readonly type: string = TodoActions.LIST_LOADING;
  public payload = null;
  constructor() {}
}

export class ModifyTodoAction implements Action {
  readonly type: string = TodoActions.MODIFY;

  constructor(public payload: Update<Todo>) {}
}

export type TodoActionList =
  ModifyTodoAction |
  ListTodoLoadedAction |
  ListTodoLoadingAction |
  AddTodoAction;

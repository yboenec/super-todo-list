import { Action } from '@ngrx/store';
import { Todo } from '../model/todo.interface';
import { Update } from '@ngrx/entity';

export enum TodoActions {
  ADD = 'Add todo',
  LIST = 'List todo',
  MODIFY = 'Modify todo'
}

export class AddTodoAction implements Action {
  readonly type: string = TodoActions.ADD;

  constructor(public payload: {todo: Todo}) {}
}

export class ListTodoAction implements Action {
  readonly type: string = TodoActions.LIST;

  constructor(public payload: {todos: Todo[]}) {}
}

export class ModifyTodoAction implements Action {
  readonly type: string = TodoActions.MODIFY;

  constructor(public payload: {todo: Update<Todo>}) {}
}

export type TodoActionsList =
  ModifyTodoAction |
  ListTodoAction |
  AddTodoAction;

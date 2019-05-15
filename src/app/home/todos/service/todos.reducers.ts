import { TodoActionsList, AddTodoAction, TodoActions } from './todos.actions';
import { Todo } from './../model/todo.interface';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface TodoState extends EntityState<Todo> {
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState = adapter.getInitialState();

export function reducer(state = initialState, action: TodoActionsList) {
  switch (action.type) {
    case TodoActions.LIST:
      return adapter.addAll(action.payload.todos, state);
    case TodoActions.ADD:
      return adapter.addOne(action.payload.todo, state);
    case TodoActions.MODIFY:
      return adapter.updateOne(action.payload.todo, state);
  }
}

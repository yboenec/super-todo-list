import { TodoActionList, TodoActions } from './todos.actions';
import { Todo } from './../model/todo.interface';
import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TodoState extends EntityState<Todo> {
  loaded: boolean;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState = adapter.getInitialState({
  loaded: false
});

export function todoReducer(state = initialState, action: TodoActionList): TodoState {
  switch (action.type) {
    case TodoActions.LIST_LOADED:
      if (!state.loaded) {
        return adapter.addAll(action.payload, {...state, loaded: true});
      }
      return state;
    case TodoActions.ADD:
      return adapter.addOne(action.payload, state);
    case TodoActions.MODIFY:
      return adapter.updateOne(action.payload, state);
    default:
      return state;
  }
}

export const selectTodosState = createFeatureSelector<TodoState>('todo');

const {
  selectEntities,
  selectAll,
} = adapter.getSelectors();

// select the dictionary of todos entities
export const selectTodosEntities = createSelector(selectTodosState, selectEntities);

// select the array of todos
export const selectAllTodos = createSelector(selectTodosState, selectAll);

export const selectCurrentTodoId = createSelector(selectTodosEntities, todos => (id: string) => {
  return todos[id];
});

import { Update } from '@ngrx/entity';
import { map } from 'rxjs/operators';
import { ListTodoLoadingAction, ModifyTodoAction } from './../service/todos.actions';
import { TodoState, selectAllTodos } from './../service/todos.reducers';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo.interface';
import { Store, select } from '@ngrx/store';

@Component({
  templateUrl: './listtodos.component.html',
  styleUrls: ['./listtodos.component.scss']
})
export class ListTodosComponent implements OnInit {

  todoList: Array<Todo>;

  constructor(private store: Store<TodoState>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(selectAllTodos), map(todos => todos.sort(this.compareTodo))).subscribe(todos => {
      this.todoList = todos;
    });
    this.loadTodo();
  }

  acknowledge(id: number): void {
    const update = {
      id,
      changes: {acknowledge: true}
    };
    this.store.dispatch(new ModifyTodoAction(update));
  }

  private loadTodo(): void {
    this.store.dispatch(new ListTodoLoadingAction());
  }

  private compareTodo(a: Todo, b: Todo): number {
    if (a.acknowledge && b.acknowledge) {
      return 0;
    } else if (a.acknowledge && !b.acknowledge) {
      return 1;
    } else {
      return -1;
    }
  }
}

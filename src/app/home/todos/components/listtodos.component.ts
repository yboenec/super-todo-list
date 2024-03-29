import { AddTodoComponent } from './addtodo.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ListTodoLoadingAction, ModifyTodoAction } from './../service/todos.actions';
import { TodoState, selectAllTodos } from './../service/todos.reducers';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../model/todo.interface';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './listtodos.component.html',
  styleUrls: ['./listtodos.component.scss']
})
export class ListTodosComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['Title', 'Status', 'Action'];
  todoList: Array<Todo>;
  private storeSub: Subscription;

  constructor(private store: Store<TodoState>, public router: Router, private dialogService: MatDialog) {
  }

  ngOnInit(): void {
    this.loadEntities();
    this.loadTodo();
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  acknowledge(id: number): void {
    const update = {
      id,
      changes: {acknowledge: true}
    };
    this.store.dispatch(new ModifyTodoAction(update));
  }

  addTodo(): void {
    this.dialogService.open(AddTodoComponent,  {
      width: '400px',
    }).afterClosed().subscribe(() => this.loadEntities());
  }

  loadEntities(): void {
    this.storeSub = this.store.select(selectAllTodos).subscribe(todos => {
      this.todoList = todos.sort(this.compareDate);
      this.todoList = this.todoList.sort(this.compareAck);
    });
  }

  private loadTodo(): void {
    this.store.dispatch(new ListTodoLoadingAction());
  }

  private compareAck(a: Todo, b: Todo): number {
    if (a.acknowledge && b.acknowledge) {
      return 0;
    } else if (a.acknowledge && !b.acknowledge) {
      return 1;
    } else {
      return -1;
    }
  }

  private compareDate(a: Todo, b: Todo): number {
    if (a.creationDate > b.creationDate) {
      return 1;
    } else if (a.creationDate < b.creationDate) {
      return -1;
    } else {
      return 0;
    }
  }
}

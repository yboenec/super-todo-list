import { TodosService } from './../service/todos.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo.interface';

@Component({
  templateUrl: './listtodos.component.html',
  styleUrls: ['./listtodos.component.scss']
})
export class ListTodosComponent implements OnInit {

  todoList: Array<Todo>;

  constructor(private todoService: TodosService) {
  }

  ngOnInit(): void {
    this.todoService.list().subscribe(res => {
      this.todoList = res;
    });
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from './../../../shared/services/crud.service';
import { Todo } from './../model/todo.interface';

@Injectable()
export class TodosService extends CrudService<Todo> {

  private static API_URL = '/todo';

  constructor(http: HttpClient) {
    super(http, TodosService.API_URL);
  }
}

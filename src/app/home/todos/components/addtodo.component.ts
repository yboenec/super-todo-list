import { AddTodoAction } from './../service/todos.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Todo } from '../model/todo.interface';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.scss']
})
export class AddTodoComponent implements OnInit {

  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddTodoComponent>, private store: Store<Todo>) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(Math.random()),
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      creationDate: new FormControl(new Date()),
      acknowledge: new FormControl(false)
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {

    this.store.dispatch(new AddTodoAction(this.form.value));
    this.dialogRef.close();
  }
}

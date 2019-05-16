import { ModifyTodoAction } from './../service/todos.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Todo } from '../model/todo.interface';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { selectCurrentUserId } from '../service/todos.reducers';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  todo: Todo;
  private subRoute: Subscription;
  private storeSub: Subscription;

  constructor(private store: Store<Todo>, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.subRoute = this.route.paramMap.subscribe(params => {
      this.storeSub = this.store.pipe(select(selectCurrentUserId), map(f => f(params.get('id')))).subscribe(todo => {
        if (!todo) {
          this.back();
        }
        this.todo = todo;
      });
    });
  }

  acknowledge(id: number): void {
    const update = {
      id,
      changes: {acknowledge: true}
    };
    this.store.dispatch(new ModifyTodoAction(update));
    this.router.navigate(['home', 'todos']);
  }

  back(): void {
    this.router.navigate(['home', 'todos']);
  }

  ngOnDestroy(): void {
    this.subRoute.unsubscribe();
    this.storeSub.unsubscribe();
  }
}

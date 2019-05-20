import { RouterTestingModule } from '@angular/router/testing';
import { TodosEffects } from './../service/todos.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { BackendModule } from './../../../backend/backend.module';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { todoReducer } from '../service/todos.reducers';
import { TodosService } from '../service/todos.service';
import { ListTodoLoadingAction } from '../service/todos.actions';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

describe('Todo component', () => {
  let fixture: ComponentFixture<TodoComponent>;
  let comp: TodoComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [SharedModule, BackendModule.forRoot(),
        StoreModule.forRoot({}), StoreModule.forFeature('todo', todoReducer), EffectsModule.forRoot([]),
        EffectsModule.forFeature([TodosEffects]), RouterTestingModule],
      providers: [TodosService, { provide: ActivatedRoute, useValue: {params: of({id: 2})}}]
    }).compileComponents();
    fixture = TestBed.createComponent(TodoComponent);
    comp = fixture.debugElement.componentInstance;
    const store = fixture.debugElement.injector.get(Store);
    store.dispatch(new ListTodoLoadingAction());
    fixture.detectChanges();
  }));

  it('Should create the component', (done) => {
    expect(comp).toBeTruthy();
    expect(comp.todo).toBeTruthy();
    done();
  });

  it('Should acknowledge the todo', (done) => {
    const spyStore = spyOn(fixture.debugElement.injector.get(Store), 'dispatch');
    const spyRouter = spyOn(fixture.debugElement.injector.get(Router), 'navigate');
    const check = fixture.nativeElement.querySelector('.check');
    check.click();
    fixture.detectChanges();
    expect(spyStore).toHaveBeenCalled();
    expect(spyRouter).toHaveBeenCalledWith(['home', 'todos']);
    done();
  });

  it('should navigate to the list todo', (done) => {
    const spyRouter = spyOn(fixture.debugElement.injector.get(Router), 'navigate');
    const back = fixture.nativeElement.querySelector('.back');
    back.click();
    fixture.detectChanges();
    expect(spyRouter).toHaveBeenCalledWith(['home', 'todos']);
    done();
  });

});


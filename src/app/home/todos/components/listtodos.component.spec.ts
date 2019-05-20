import { TodosEffects } from './../service/todos.effects';
import { EffectsModule } from '@ngrx/effects';
import { BackendModule } from './../../../backend/backend.module';
import { ListTodosComponent } from './listtodos.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatTableModule, MatIconModule, MatDialog, MatDialogRef } from '@angular/material';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { todoReducer } from '../service/todos.reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { TodosService } from '../service/todos.service';
import { of } from 'rxjs';

describe('List todo component', () => {
  let fixture: ComponentFixture<ListTodosComponent>;
  let comp: ListTodosComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListTodosComponent],
      imports: [MatDialogModule, MatTableModule, NoopAnimationsModule, RouterTestingModule, MatIconModule, BackendModule.forRoot(),
      StoreModule.forRoot({}), StoreModule.forFeature('todo', todoReducer), EffectsModule.forRoot([]),
      EffectsModule.forFeature([TodosEffects])],
      providers: [TodosService, {provide: MatDialogRef, useValue: {afterClosed: () => of('close')}}]
    }).compileComponents();
    fixture = TestBed.createComponent(ListTodosComponent);
    comp = fixture.debugElement.componentInstance;
  }));

  it('Should create the component', (done) => {
    fixture.detectChanges();
    expect(comp).toBeTruthy();
    expect(comp.todoList.length).toEqual(7);
    done();
  });

  it('should open the create todo', (done) => {
    fixture.detectChanges();
    const openSpy = spyOn(fixture.debugElement.injector.get(MatDialog), 'open');
    const addButton = fixture.nativeElement.querySelector('.add');
    addButton.click();
    fixture.detectChanges();
    expect(openSpy).toHaveBeenCalled();
    fixture.nativeElement.click();
    done();
  });

  it('should acknowledge the first element of the list', (done) => {
    fixture.detectChanges();
    const spyStore = spyOn(fixture.debugElement.injector.get(Store), 'dispatch');
    const firstTodo = fixture.nativeElement.querySelector('.ack');
    firstTodo.click();
    fixture.detectChanges();
    expect(spyStore).toHaveBeenCalled();
    done();
  });

});


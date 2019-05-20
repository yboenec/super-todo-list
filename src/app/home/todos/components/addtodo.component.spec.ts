import { AddTodoAction } from './../service/todos.actions';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatFormFieldModule, MatDialogRef } from '@angular/material';
import { AddTodoComponent } from './addtodo.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { todoReducer } from '../service/todos.reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { fillInput } from 'src/test/utils';
import { By } from '@angular/platform-browser';

describe('Add todo component', () => {
  let fixture: ComponentFixture<AddTodoComponent>;
  let comp: AddTodoComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTodoComponent],
      imports: [MatDialogModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, NoopAnimationsModule, RouterTestingModule,
      StoreModule.forRoot({}), StoreModule.forFeature('todo', todoReducer)],
      providers: [{ provide: MatDialogRef, useValue: {close: () => {}} }]
    }).compileComponents();
    fixture = TestBed.createComponent(AddTodoComponent);
    comp = fixture.debugElement.componentInstance;
  }));

  it('Should create the component', (done) => {
    expect(comp).toBeTruthy();
    done();
  });

  it('Should close the modal', (done) => {
    const spyClose = spyOn(fixture.debugElement.injector.get(MatDialogRef), 'close');
    const cancelButton: HTMLElement = fixture.nativeElement.querySelector('.close');
    cancelButton.click();
    fixture.detectChanges();
    expect(spyClose).toHaveBeenCalled();
    done();
  });

  it('Should save the todo', (done) => {
    fixture.detectChanges();
    const spyStore = spyOn(fixture.debugElement.injector.get(Store), 'dispatch');
    const spyClose = spyOn(fixture.debugElement.injector.get(MatDialogRef), 'close');
    const save = fixture.nativeElement.querySelector('.save');
    const titleInput = fixture.debugElement.query(By.css('input[formControlName=title]'));
    fillInput('title', titleInput, fixture);
    expect(comp.form.valid).toBeTruthy();
    save.click();
    fixture.detectChanges();
    expect(spyStore).toHaveBeenCalled();
    expect(spyClose).toHaveBeenCalled();
    done();
  });
});


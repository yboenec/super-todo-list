import { HomeComponent } from './home.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('Home component', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let comp: HomeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.debugElement.componentInstance;
  }));

  it('Should create the component', (done) => {
    fixture.detectChanges();
    expect(comp).toBeTruthy();
    done();
  });

});


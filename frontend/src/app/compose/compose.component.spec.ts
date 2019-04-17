import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComposeComponent } from './compose.component';
import { AppModule } from '../app.module';

describe('ComposeComponent', () => {
  let component: ComposeComponent;
  let fixture: ComponentFixture<ComposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have four meta inputs', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.compose-field').length).toBe(4);
  });

  it('should have a main editor', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.editor')).toBeTruthy();
  });

  it('should have two buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button').length).toBe(2);
  });
});

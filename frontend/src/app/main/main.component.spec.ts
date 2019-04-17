import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { AppModule } from '../app.module';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a loading dialog and nothing else', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.loading-container')).toBeTruthy();
    expect(compiled.querySelector('.sidebar')).toBeFalsy();
    expect(compiled.querySelector('.message-list')).toBeFalsy();
    expect(compiled.querySelector('.message')).toBeFalsy();
  });

  it('should show all three sections after loading', () => {
    component.loading = false;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.sidebar')).toBeTruthy();
    expect(compiled.querySelector('.message-list')).toBeTruthy();
    expect(compiled.querySelector('.message')).toBeTruthy();
  });
});

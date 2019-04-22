import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAuthComponent } from './other-auth.component';
import { AppModule } from '../../app.module';

describe('OtherAuthComponent', () => {
  let component: OtherAuthComponent;
  let fixture: ComponentFixture<OtherAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the completion dialog when an account is added', () => {
    component.authStatus = 'complete';
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-card-title').textContent).toContain('You\'re all set!');
  });

  it('shows step 1', () => {
    component.authStatus = 'pending';
    component.step = 1;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-card-title').textContent).toContain('Add an email account');
  });

  it('shows step 2', () => {
    component.authStatus = 'pending';
    component.step = 2;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-card-subtitle').textContent).toContain('We couldn\'t');
  });

  it('shows the error dialog when adding account fails', () => {
    component.authStatus = 'error';
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-card-title').textContent).toContain('That didn\'t work');
  });
});

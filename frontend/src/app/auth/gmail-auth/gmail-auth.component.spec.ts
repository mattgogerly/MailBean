import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailAuthComponent } from './gmail-auth.component';
import { AppModule } from '../../app.module';

describe('GmailAuthComponent', () => {
  let component: GmailAuthComponent;
  let fixture: ComponentFixture<GmailAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailAuthComponent);
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

  it('shows waiting for authorisation dialog', () => {
    component.authStatus = 'pending';
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-card-title').textContent).toContain('Waiting for authorisation');
  });

  it('shows the error dialog when adding account fails', () => {
    component.authStatus = 'error';
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-card-title').textContent).toContain('That didn\'t work');
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageComponent } from './message.component';
import { AppModule } from '../app.module';
import { DetailedMessage } from '../redux/models/detailed-message';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have message controls', () => {
    component.display = true;
    component.message = new DetailedMessage();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.controls').children.length).toEqual(4);
  });

  it('should not show message composer when composing is false', () => {
    component.display = true;
    component.message = new DetailedMessage();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.compose-container')).toBeFalsy();
    expect(compiled.querySelector('.message-container')).toBeTruthy();
  });

  it('should show message composer when composing is true', () => {
    component.composing = true;
    component.message = new DetailedMessage();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.compose-container')).toBeTruthy();
    expect(compiled.querySelector('.message-container')).toBeFalsy();
  });
});

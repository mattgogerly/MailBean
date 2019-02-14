import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailAuthComponent } from './gmail-auth.component';

describe('GmailAuthComponent', () => {
  let component: GmailAuthComponent;
  let fixture: ComponentFixture<GmailAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmailAuthComponent ]
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
});

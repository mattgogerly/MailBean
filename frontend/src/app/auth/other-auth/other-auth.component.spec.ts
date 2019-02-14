import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAuthComponent } from './other-auth.component';

describe('OtherAuthComponent', () => {
  let component: OtherAuthComponent;
  let fixture: ComponentFixture<OtherAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherAuthComponent ]
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
});

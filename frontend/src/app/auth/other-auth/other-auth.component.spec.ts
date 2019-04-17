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
});

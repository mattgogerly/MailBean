import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
import { AppModule } from '../../app.module';

describe('AccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AppModule
    ]
  }));

  it('should be created', () => {
    const service: AccountService = TestBed.get(AccountService);
    expect(service).toBeTruthy();
  });
});

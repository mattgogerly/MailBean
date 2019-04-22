import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AccountService } from './account.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject } from '@angular/core/testing';
import { AccountHandler } from '../../auth/utils/AccountHandler';

describe('AccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AccountService
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  afterEach(inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', () => {
    const service: AccountService = TestBed.get(AccountService);
    expect(service).toBeTruthy();
  });

  it('calls API to get all accounts',
    inject([HttpTestingController, AccountService],
      (httpMock: HttpTestingController, service: AccountService) => {
      service.getAccounts().subscribe(data => {
        expect(data[0].id).toBe('test');
        expect(data.length).toBe(1);
      });

      const req = httpMock.expectOne('http://localhost:36024/accounts');
      expect(req.request.method).toBe('GET');

      req.flush([{id: 'test'}]);
    })
  );

  it('calls API to test account connection',
    fakeAsync(inject([HttpTestingController, AccountService],
      (httpMock: HttpTestingController, service: AccountService) => {
      const account = {
        id: 'abc',
        email: 'test@test.com',
        name: 'test',
        provider: 'test provider',
        connectionSettings: {}
      };

      service.testAccountConnection(account,'123')
        .then(res => res.subscribe(data => {
          expect(data).toBeTruthy();
        })
      );

      tick();

      const req = httpMock.expectOne('http://localhost:36024/accounts/test/123');
      expect(req.request.method).toBe('POST');

      req.flush('true');
    })
  ));

  it('calls API to add account',
    inject([HttpTestingController, AccountService],
      (httpMock: HttpTestingController, service: AccountService) => {
      const account = {
        id: 'abc',
        email: 'test@test.com',
        name: 'test',
        provider: 'test provider',
        connectionSettings: {}
      };

      service.addAccount(account).subscribe(data => {
        expect(data).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:36024/accounts');
      expect(req.request.method).toBe('POST');

      req.flush('true');
    })
  );

  it('calls API to delete account',
    inject([HttpTestingController, AccountService],
      (httpMock: HttpTestingController, service: AccountService) => {
      spyOn(AccountHandler, 'deletePasswordFromManager').and.returnValue(true);
      service.deleteAccount('123').subscribe(data => {
        expect(data).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:36024/accounts/123');
      expect(req.request.method).toBe('DELETE');

      req.flush('true');
    })
  );

  it('calls API to set current account',
    inject([HttpTestingController, AccountService],
      (httpMock: HttpTestingController, service: AccountService) => {
      spyOn(AccountHandler, 'getPasswordFromManager').and.returnValue('password');
      service.setCurrentAccount('123').subscribe(data => {
        expect(data).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:36024/accounts/123');
      expect(req.request.method).toBe('POST');

      req.flush('true');
    })
  );
});

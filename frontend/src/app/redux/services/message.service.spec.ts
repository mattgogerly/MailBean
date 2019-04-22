import { inject, TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DetailedMessage } from '../models/detailed-message';
import { NewMessageInfo } from '../models/new-message-info';

describe('MessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MessageService
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  it('calls API to sync with server',
    inject([HttpTestingController, MessageService],
      (httpMock: HttpTestingController, service: MessageService) => {
      service.syncWithServer('test', 25).subscribe(data => {
        expect(data).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:36024/imap/test/server/25');
      expect(req.request.method).toBe('GET');

      req.flush('true');
    })
  );

  it('calls API to get local data',
    inject([HttpTestingController, MessageService],
      (httpMock: HttpTestingController, service: MessageService) => {
      service.getLocal('test').subscribe(data => {
        expect(data.folders.length).toBe(1);
        expect(data.messages.length).toBe(3);
      });

      const req = httpMock.expectOne('http://localhost:36024/imap/test');
      expect(req.request.method).toBe('GET');

      const response = {
        folders: [{}],
        messages: [{}, {}, {}]
      };
      req.flush(response);
    })
  );

  it('calls API to get local data',
    inject([HttpTestingController, MessageService],
      (httpMock: HttpTestingController, service: MessageService) => {
      const message: DetailedMessage = {
        folder: {
          name: 'test folder',
          unread: 0,
          latestUid: 0,
          oldestUid: 0
        },
        uid: 1,
        messageNum: 1,
        received: 'now',
        sender: 'test sender',
        to: [],
        cc: [],
        subject: 'test subject',
        seen: true,
        content: 'test content',
        phishing: true
      };

      service.delete('test', message).subscribe(data => {
        expect(data).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:36024/imap/test/1/delete');
      expect(req.request.method).toBe('DELETE');

      req.flush('true');
    })
  );

  it('calls API to mark read',
    inject([HttpTestingController, MessageService],
      (httpMock: HttpTestingController, service: MessageService) => {
      const message: DetailedMessage = {
        folder: {
          name: 'test folder',
          unread: 0,
          latestUid: 0,
          oldestUid: 0
        },
        uid: 1,
        messageNum: 1,
        received: 'now',
        sender: 'test sender',
        to: [],
        cc: [],
        subject: 'test subject',
        seen: true,
        content: 'test content',
        phishing: true
      };

      service.markRead('test', message).subscribe(data => {
        expect(data).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:36024/imap/test/1/read');
      expect(req.request.method).toBe('PUT');

      req.flush('true');
    })
  );

  it('calls API to send message',
    inject([HttpTestingController, MessageService],
      (httpMock: HttpTestingController, service: MessageService) => {
      const message: NewMessageInfo = {
        to: [],
        cc: [],
        bcc: [],
        subject: 'test subject',
        content: 'test content',
        reply: false,
        replyAll: false,
        replyTo: -1
      };

      service.sendMessage('test', message).subscribe(data => {
        expect(data).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:36024/smtp/test');
      expect(req.request.method).toBe('POST');

      req.flush('true');
    })
  );
});

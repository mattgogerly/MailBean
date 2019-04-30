import { Folder } from './folder';

export class DetailedMessage {
  folder: Folder;
  id: MessageId;
  messageNum: number;
  received: string;
  sender: string;
  to: string[];
  cc: string[];
  subject: string;
  seen: boolean;
  content: string;
  phishing: boolean;
}

class MessageId {
  uid: number;
}

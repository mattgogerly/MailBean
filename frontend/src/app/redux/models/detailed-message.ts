import { Folder } from './folder';

export class DetailedMessage {
  folder: Folder;
  uid: number;
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

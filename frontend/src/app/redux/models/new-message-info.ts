export class NewMessageInfo {
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  content: string;
  reply: boolean;
  replyAll: boolean;
  replyTo: number;
}

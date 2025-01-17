export class FeedBackMessage {
  type: string;
  message: string;
  code: string;

  constructor(type: string, message: string, code: string) {
    this.type = type;
    this.message = message;
    this.code = code;
  }
}

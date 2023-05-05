import { Logger } from "@nestjs/common";

export abstract class Base {
  protected method: 'GET' | 'POST';
  protected url: string;
  protected data: Object;
  protected formName: string;
  protected files: Array<Express.Multer.File>;
  protected logger: Logger;
  abstract sendHook(): Promise<void>;

  constructor(
    method: 'GET' | 'POST',
    url: string,
    data: Object,
    formName: string,
    files: Array<Express.Multer.File>
  ) {
    this.method = method;
    this.url = url;
    this.data = data;
    this.formName = formName;
    this.files = files;
    this.logger = new Logger(this.formName);
  }
}

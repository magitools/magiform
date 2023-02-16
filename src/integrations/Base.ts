export abstract class Base {
  protected method: 'GET' | 'POST';
  protected url: string;
  protected data: Object;
  protected formName: string;
  abstract sendHook(): Promise<void>;

  constructor(
    method: 'GET' | 'POST',
    url: string,
    data: Object,
    formName: string,
  ) {
    this.method = method;
    this.url = url;
    this.data = data;
    this.formName = formName;
  }
}

import { Base } from './Base';

export default class Discord extends Base {
  constructor(url: string, data: Object, formData: string) {
    super('POST', url, data, formData);
  }
  public async sendHook() {
    const embedFields = [];
    Object.keys(this.data).forEach((e) => {
      embedFields.push({ name: e, value: this.data[e], inline: false });
    });
    try {
      await fetch(this.url, {
        method: this.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.formName,
          embeds: [
            {
              title: `FormHub - ${this.formName}`,
              fields: embedFields,
            },
          ],
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }
}

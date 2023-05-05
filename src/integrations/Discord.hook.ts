import { Logger } from '@nestjs/common';
import { Base } from './Base';

export default class Discord extends Base {
  constructor(url: string, data: Object, formData: string, files: Array<Express.Multer.File>) {
    super('POST', url, data, formData, files);
    this.logger = new Logger("discord")
  }
  public async sendHook() {
    const formData = new FormData();
    const embedFields = [];
    const attachments = []
    Object.keys(this.data).forEach((e) => {
      embedFields.push({ name: e, value: this.data[e], inline: false });
    });
    this.files.forEach((f, idx) => {
      formData.append(`file${idx}`, new Blob([f.buffer]))
      attachments.push({id: idx, description: f.originalname, filename: f.filename});
    })
    formData.append("payload_json", JSON.stringify({embeds: embedFields, attachments, username: this.formName}));
    try {
      const res = await fetch(this.url, {
        method: this.method,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      });
      if (!res.ok) throw(res)
    } catch (error) {
      this.logger.error(error.status)
      console.log(formData);
      const body = await error.json()
      this.logger.error(body)
    }
  }
}

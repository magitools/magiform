import { Base } from './Base';
import { getStoragePath } from 'src/multer/utils.multer';

export default class Discord extends Base {
  constructor(url: string, data: Object, formData: string, files: Array<Express.Multer.File>) {
    super('POST', url, data, formData, files);
  }
  public async sendHook() {
    const embedFields = [];
    const fileFields = []
    Object.keys(this.data).forEach((e) => {
      embedFields.push({ name: e, value: this.data[e] });
    });
    this.files.forEach((f, idx) => {
      fileFields.push({name: f.originalname, value: getStoragePath(f)})
    })
    const data = {
      username: `MagiForm - ${this.formName}`,
      embeds: [
        {
          title: `Fields`,
          fields: embedFields,
          timestamp: new Date()
        }
      ]
    }
    if (this.files.length > 0) {
      data.embeds.push({title:`Files`, fields: fileFields, timestamp: new Date()})
    }
    try {
      const res = await fetch(this.url, {
        method: this.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw(res)
    } catch (error) {
      this.logger.error(error.status)
      const body = await error.json()
      this.logger.error(body)
    }
  }
}

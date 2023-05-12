import { getStoragePath } from 'src/multer/utils.multer';
import { Base } from './Base';

export default class Teams extends Base {
  constructor(url: string, data: Object, formData: string, files: Array<Express.Multer.File>) {
    super('POST', url, data, formData, files);
  }

  async sendHook(): Promise<void> {
    await fetch(this.url, {
      method: 'post',
      body: JSON.stringify({
        type: 'message',
        attachments: [
          {
            contentType: 'application/vnd.microsoft.card.adaptive',
            contentUrl: null,
            content: {
              $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
              type: 'AdaptiveCard',
              version: '1.2',
              body: [
                {
                  type: "TextBlock",
                  size: "ExtraLarge",
                  weight: "Bolder",
                  style: "heading",
                  text: `MagiForm - ${this.formName}`,
                },
                {
                  type: 'Container',
                  items: [
                    {
                      type: "TextBlock",
                      size: "Large",
                      weight: "Bolder",
                      text: 'Fields',
                    },
                    {
                      type: 'FactSet',
                      facts: Object.keys(this.data).map((e) => ({
                        title: e,
                        value: this.data[e],
                      })),
                    },
                  ],
                },
                {
                  type: "Container",
                  items: [
                    {
                      type: "TextBlock",
                      size: "Large",
                      weight: "Bolder",
                      text: 'Files'
                    },
                    {
                      type: 'FactSet',
                      facts:this.files.map((e) => ({
                        title: e.filename,
                        value: getStoragePath(e),
                      })),
                    },
                  ]
                }
              ],
            },
          },
        ],
      }),
    });
  }
}

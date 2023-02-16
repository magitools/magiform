import { Base } from './Base';

export default class Teams extends Base {
  constructor(url: string, data: Object, formData: string) {
    super('POST', url, data, formData);
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
                  type: 'Container',
                  items: [
                    {
                      type: 'TextBlock',
                      text: `${this.formName}`,
                      weight: 'bolder',
                      size: 'medium',
                    },
                  ],
                },
                {
                  type: 'Container',
                  items: [
                    {
                      type: 'FactSet',
                      facts: Object.keys(this.data).map((e) => ({
                        title: e,
                        value: this.data[e],
                      })),
                    },
                  ],
                },
              ],
            },
          },
        ],
      }),
    });
  }
}

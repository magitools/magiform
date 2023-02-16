import { readdir } from 'fs/promises';

export const integrationsProvider = [
  {
    provide: 'HOOK_INTEGRATIONS',
    useFactory: async () => {
      return ['Discord', 'Teams'];
    },
  },
];

import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod';

export const env = createEnv({
  server: {
    URL_BOX_STATUS: z.url(),
  },
  clientPrefix: 'VITE_',
  client: {
    VITE_MSW_BEHAVIOUR: z
      .enum(['OK', 'SLOW', '404', 'NETWORK', 'TIMEOUT', 'INVALID_HTML', 'INVALID_FIELDS'])
      .default('OK'),
  },
  runtimeEnv: {
    // Node
    URL_BOX_STATUS: globalThis.process?.env.URL_BOX_STATUS,
    // Vite
    VITE_MSW_BEHAVIOUR: import.meta.env?.VITE_MSW_BEHAVIOUR,
  },
  emptyStringAsUndefined: true,
});

import { Zodios } from '@zodios/core';
import z from 'zod';

export const apiClient = new Zodios('/api', [
  {
    alias: 'getBoxData',
    method: 'get',
    path: 'http://fritz.box/cgi-bin/system_status',
    response: z
      .string()
      .nonempty('Must not be empty'),
  },
]);

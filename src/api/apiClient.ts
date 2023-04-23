import { Zodios } from '@zodios/core';
import z from 'zod';

export const apiClient = new Zodios('/api', [
  {
    alias: 'getBoxData',
    method: 'get',
    path: 'http://fritz.box/cgi-bin/system_status',
    response: z.string(
      // {
      // eslint-disable-next-line @typescript-eslint/camelcase
      // required_error: 'Must not be empty',
      // }
    ),
    // .nonempty('Must not be empty'),
  },
]);

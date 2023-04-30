import { Zodios, makeApi } from '@zodios/core';

import { boxValueString } from '../schema/box.schema';

export const endpoints = makeApi([
  {
    alias: 'getBoxData',
    method: 'get',
    path: 'http://fritz.box/cgi-bin/system_status',
    response: boxValueString,
    requestFormat: 'text',
  },
]);

export const apiClient = new Zodios('/api', endpoints);

import React, { type CSSProperties } from 'react';
import { useRouterState, useRouter } from '@tanstack/react-router';

// import { router } from '../..';

const IndicatorNew = () => {
  const router = useRouter();

  // https://tanstack.com/router/v1/docs/framework/react/api/router/RouterEventsType
  // router.subscribe('onBeforeLoad', async ({ toLocation, fromLocation }) => {
  //   console.log('toLocation', toLocation);
  //   console.log('fromLocation', fromLocation);
  // });

  return <p style={{ color: '#FFF' } as CSSProperties}>Indicator</p>;
};

export { IndicatorNew };

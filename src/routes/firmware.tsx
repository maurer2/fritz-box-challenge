/* eslint-disable @typescript-eslint/no-use-before-define */
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Slide } from '../components/Slide';

export const Route = createFileRoute('/firmware')({
  component: Firmware,
});

function Firmware() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const {
    data: { firmware },
  } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);

  const majorVersion = firmware.slice(-3, -2);
  const minorVersion = firmware.slice(-2);

  return <Slide title="Firmware" text={`${majorVersion}.${minorVersion}`} />;
}

import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Slide } from '../components/Slide/Slide';

export const Route = createFileRoute('/firmware')({
  component: Firmware,
});

function Firmware() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const { data } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);
  const firmware = data.get('firmware');

  if (!firmware) {
    return null;
  }

  const majorVersion = firmware.slice(-3, -2);
  const minorVersion = firmware.slice(-2);

  return <Slide title="Firmware" text={`${majorVersion}.${minorVersion}`} />;
}

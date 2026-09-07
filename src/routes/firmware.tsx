import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Slide } from '../components/Slide/Slide';

export const Route = createFileRoute('/firmware')({
  component: Firmware,
  staticData: { title: 'Firmware' },
});

function Firmware() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const { data } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);
  const firmware = data.get('firmware');

  if (!firmware) {
    return (
      <Slide
        type="unavailable"
        title={Route.options.staticData.title}
      />
    );
  }

  const majorVersion = firmware.slice(-3, -2);
  const minorVersion = firmware.slice(-2);

  return (
    <Slide
      type="success"
      title={Route.options.staticData.title}
      text={`${majorVersion}.${minorVersion}`}
    />
  );
}

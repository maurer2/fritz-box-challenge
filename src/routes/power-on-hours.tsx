import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Slide } from '../components/Slide/Slide';

export const Route = createFileRoute('/power-on-hours')({
  loader: async () => {
    // only load temporal polyfill where still needed
    const Temporal = globalThis.Temporal ?? (await import('temporal-polyfill')).Temporal;

    return { Temporal };
  },
  component: PowerOnHours,
});

const durationFormatter = new Intl.DurationFormat('en-GB', { style: 'long' });
const listFormatter = new Intl.ListFormat('en-GB', {
  style: 'long',
  type: 'conjunction',
});

// https://forum.vodafone.de/t5/Plauderecke/Wie-gesamte-Laufzeit-der-Fritz-Box-ermitteln/td-p/3245922
function PowerOnHours() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const { Temporal } = Route.useLoaderData();
  const { data } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);
  const powerOnHours = data.get('powerOnHours');

  if (!powerOnHours) {
    return null;
  }

  const hours = Number.parseInt(powerOnHours.slice(0, 2), 10);
  const days = Number.parseInt(powerOnHours.slice(2, 4), 10);
  const months = Number.parseInt(powerOnHours.slice(4, 6), 10);
  const years = Number.parseInt(powerOnHours.slice(6), 10);

  const now = Temporal.Now.zonedDateTimeISO();

  const calculatedProductionDate = now.subtract({
    hours,
    days,
    months,
    years,
  });

  if (!(calculatedProductionDate instanceof Temporal.ZonedDateTime)) {
    console.warn('Invalid calculated production date');

    return 'Unknown';
  }

  const duration = calculatedProductionDate.until(now, {
    smallestUnit: 'hour',
    largestUnit: 'year',
    roundingMode: 'ceil',
  });

  // split by commas and add "and" before final part unless there's only one part
  const powerOnHoursAsParts = durationFormatter.format(duration).split(/\s*,\s*/u);
  const powerOnHoursFormatted = listFormatter.format(powerOnHoursAsParts);

  return <Slide title="Power on hours" text={powerOnHoursFormatted} />;
}

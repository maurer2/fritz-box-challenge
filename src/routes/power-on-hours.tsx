/* eslint-disable @typescript-eslint/no-use-before-define */
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Temporal } from '@js-temporal/polyfill';

import { Slide } from '../components/Slide';

export const Route = createFileRoute('/power-on-hours')({
  component: PowerOnHours,
});

// @ts-expect-error definition missing: https://github.com/microsoft/TypeScript/issues/60608
const durationFormatter = new Intl.DurationFormat('en-GB', { style: 'long' });
const listFormatter = new Intl.ListFormat('en-GB', {
  style: 'long',
  type: 'conjunction',
});

// https://forum.vodafone.de/t5/Plauderecke/Wie-gesamte-Laufzeit-der-Fritz-Box-ermitteln/td-p/3245922
function PowerOnHours() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const {
    data: { powerOnHours },
  } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);

  const hours = parseInt(powerOnHours.substring(0, 2), 10);
  const days = parseInt(powerOnHours.substring(2, 4), 10);
  const months = parseInt(powerOnHours.substring(4, 6), 10);
  const years = parseInt(powerOnHours.substring(6), 10);

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

  const duration2 = calculatedProductionDate.until(now, {
    smallestUnit: 'hour',
    largestUnit: 'year',
    roundingMode: 'ceil',
  });

  // split by commas and add "and" before final part unless there's only one part
  const powerOnHoursAsArray = (durationFormatter.format(duration2) as string).split(/\s*,\s*/);
  const powerOnHoursFormatted = listFormatter.format(powerOnHoursAsArray);

  return <Slide title="Power on hours" text={powerOnHoursFormatted} />;
}

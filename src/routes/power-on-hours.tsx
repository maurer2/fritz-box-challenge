import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Slide } from '#components/Slide/Slide';

export const Route = createFileRoute('/power-on-hours')({
  // page rendering is delayed and the (global) pending component is shown until the polyfill has loaded
  // without pendingComponent the previous slide would be shown until the loader has finished
  loader: async () => {
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 5000);
    // });
    const Temporal = globalThis.Temporal ?? (await import('temporal-polyfill')).Temporal;

    return { Temporal };
  },
  component: PowerOnHours,
  staticData: { title: 'Power-on hours' },
  pendingMs: 0, // show the default pending slide right away
});

const durationFormatter = new Intl.DurationFormat('en-GB', { style: 'long' });
const listFormatter = new Intl.ListFormat('en-GB', {
  style: 'long',
  type: 'conjunction', // "and"
});

// https://forum.vodafone.de/t5/Plauderecke/Wie-gesamte-Laufzeit-der-Fritz-Box-ermitteln/td-p/3245922
function PowerOnHours() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const { Temporal } = Route.useLoaderData();
  const { data } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);
  const powerOnHours = data.get('powerOnHours');

  if (!powerOnHours) {
    return (
      <Slide
        type="unavailable"
        title={Route.options.staticData.title}
      />
    );
  }
  // throw new Error('meow');

  const [hours, days, months, years] = [0, 2, 4, 6].map((start, index, currentArray) => {
    const substring = powerOnHours.slice(start, currentArray[index + 1]);

    return Math.trunc(Number(substring));
  });
  const now = Temporal.Now.zonedDateTimeISO();

  const calculatedProductionDate = now.subtract({
    hours,
    days,
    months,
    years,
  });

  if (!(calculatedProductionDate instanceof Temporal.ZonedDateTime)) {
    throw new Error('Invalid calculated production date'); // gets caught by errorComponent
  }

  const duration = calculatedProductionDate.until(now, {
    smallestUnit: 'hour',
    largestUnit: 'year',
    roundingMode: 'ceil',
  });

  // split by commas and add "and" before final part unless there's only one part
  const powerOnHoursAsParts = durationFormatter.format(duration).split(/\s*,\s*/u);
  const powerOnHoursFormatted = listFormatter.format(powerOnHoursAsParts);

  return (
    <Slide
      type="success"
      title={Route.options.staticData.title}
      text={powerOnHoursFormatted}
    />
  );
}

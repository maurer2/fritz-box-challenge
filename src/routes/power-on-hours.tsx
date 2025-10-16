/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { subHours, subDays, subMonths, subYears, intervalToDuration } from 'date-fns';

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
  const { fetchBoxDataQueryOptions } = Route.useRouteContext();
  const {
    data: { powerOnHours },
  } = useSuspenseQuery(fetchBoxDataQueryOptions);
  const powerOnHoursCalculated = useMemo(() => {
    const now = new Date();
    const hours = parseInt(powerOnHours.substring(0, 2), 10);
    const days = parseInt(powerOnHours.substring(2, 4), 10);
    const months = parseInt(powerOnHours.substring(4, 6), 10);
    const years = parseInt(powerOnHours.substring(6), 10);

    const hypotheticalProductionDate = [now]
      .values()
      .map((date) => subHours(date, hours))
      .map((date) => subDays(date, days))
      .map((date) => subMonths(date, months))
      .map((date) => subYears(date, years))
      .toArray()
      .at(0);

    if (!(hypotheticalProductionDate instanceof Date)) {
      console.warn('Invalid hypothetical production date');

      return 'Unknown';
    }

    const duration = intervalToDuration({
      start: hypotheticalProductionDate,
      // start: subDays(now, 30),
      // start: subDays(now, 31),
      // start: subDays(now, 62),
      end: now,
    });
    // split by commas and add "and" before final part unless there's only one part
    const powerOnHoursAsArray = (durationFormatter.format(duration) as string).split(/\s*,\s*/);
    const powerOnHoursFormatted = listFormatter.format(powerOnHoursAsArray);

    return powerOnHoursFormatted;
  }, [powerOnHours]);

  return (
    <div className="view-transition">
      <Slide title="Power on hours" text={powerOnHoursCalculated} />
    </div>
  );
}

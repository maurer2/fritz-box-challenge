/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Slide } from '../components/Slide';

export const Route = createFileRoute('/power-on-hours')({
  component: PowerOnHours,
});

// https://forum.vodafone.de/t5/Plauderecke/Wie-gesamte-Laufzeit-der-Fritz-Box-ermitteln/td-p/3245922

function PowerOnHours() {
  const { fetchBoxDataQueryOptions } = Route.useRouteContext();
  const { data: boxData } = useSuspenseQuery(fetchBoxDataQueryOptions);

  return (
    <div className="view-transition">
      <Slide title="Power on hours" text={boxData.powerOnHours} />
    </div>
  );
}

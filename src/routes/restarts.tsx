/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Slide } from '../components/Slide';

export const Route = createFileRoute('/restarts')({
  component: Restarts,
});

function Restarts() {
  const { fetchBoxDataQueryOptions } = Route.useRouteContext();
  const { data: boxData } = useSuspenseQuery(fetchBoxDataQueryOptions);

  return (
    <div className="view-transition">
      <Slide title="Restarts" text={boxData.restarts} />
    </div>
  );
}

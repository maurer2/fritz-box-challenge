/* eslint-disable @typescript-eslint/no-use-before-define */
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Slide } from '../components/Slide';

export const Route = createFileRoute('/restarts')({
  component: Restarts,
});

function Restarts() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const {
    data: { restarts },
  } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);

  const majorValue = parseInt(restarts.substring(0, 2), 10);
  const minorValue = parseInt(restarts.substring(2), 10);

  // https://www.ip-phone-forum.de/threads/was-wird-beim-system-status-angezeigt.138546/post-2303890
  // https://www.ip-phone-forum.de/threads/servicecode-der-fritzbox.310849/post-2438609
  const calculatedRestarts = majorValue * 32 + minorValue;

  return <Slide title="Restarts" text={calculatedRestarts.toString().padStart(3, '0')} />;
}

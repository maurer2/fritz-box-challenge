import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Slide } from '../components/Slide/Slide';

export const Route = createFileRoute('/restarts')({
  component: Restarts,
});

function Restarts() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const { data } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);
  const restarts = data.get('restarts');

  if (!restarts) {
    return null;
  }

  const majorValue = Number.parseInt(restarts.slice(0, 2), 10);
  const minorValue = Number.parseInt(restarts.slice(2), 10);

  // https://www.ip-phone-forum.de/threads/was-wird-beim-system-status-angezeigt.138546/post-2303890
  // https://www.ip-phone-forum.de/threads/servicecode-der-fritzbox.310849/post-2438609
  const calculatedRestarts = majorValue * 32 + minorValue;

  return <Slide title="Restarts" text={calculatedRestarts.toString().padStart(3, '0')} />;
}

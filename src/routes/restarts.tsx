import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Slide } from '../components/Slide/Slide';

export const Route = createFileRoute('/restarts')({
  component: Restarts,
  staticData: { title: 'Restarts' },
});

function Restarts() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const { data } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);
  const restarts = data.get('restarts');

  if (!restarts) {
    return null;
  }

  const majorValue = Math.trunc(Number(restarts.slice(0, 2)));
  const minorValue = Math.trunc(Number(restarts.slice(2)));

  // https://www.ip-phone-forum.de/threads/was-wird-beim-system-status-angezeigt.138546/post-2303890
  // https://www.ip-phone-forum.de/threads/servicecode-der-fritzbox.310849/post-2438609
  const calculatedRestarts = majorValue * 32 + minorValue;

  return (
    <Slide
      title={Route.options.staticData?.title ?? ''}
      text={calculatedRestarts.toString().padStart(3, '0')}
    />
  );
}

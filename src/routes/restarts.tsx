import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Slide } from '#components/Slide/Slide';

export const Route = createFileRoute('/restarts')({
  component: Restarts,
  staticData: { title: 'Restarts' },
});

function Restarts() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const { data } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);
  const restarts = data.get('restarts');

  if (!restarts) {
    return (
      <Slide
        type="unavailable"
        title={Route.options.staticData.title}
      />
    );
  }

  // workaround as Math.trunc(Number(restarts.slice())); breaks the compiler -> component doesn't get optimized
  const majorSegment = restarts.slice(0, 2);
  const minorSegment = restarts.slice(2);
  const majorValue = Math.trunc(Number(majorSegment));
  const minorValue = Math.trunc(Number(minorSegment));

  // https://www.ip-phone-forum.de/threads/was-wird-beim-system-status-angezeigt.138546/post-2303890
  // https://www.ip-phone-forum.de/threads/servicecode-der-fritzbox.310849/post-2438609
  const calculatedRestarts = majorValue * 32 + minorValue;

  return (
    <Slide
      type="success"
      title={Route.options.staticData.title}
      text={calculatedRestarts.toString().padStart(3, '0')}
    />
  );
}

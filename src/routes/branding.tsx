import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { match } from 'ts-pattern';

import { Slide } from '../components/Slide/Slide';

export const Route = createFileRoute('/branding')({
  errorComponent: () => (
    <Slide
      type="error"
      title={Route.options.staticData.title}
    />
  ),
  component: Branding,
  staticData: { title: 'Branding' },
});

function Branding() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const { data } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);
  const branding = data.get('branding');

  if (!branding) {
    return (
      <Slide
        type="unavailable"
        title={Route.options.staticData.title}
      />
    );
  }

  const mappedBranding = match(branding)
    .returnType<string>()
    .with('avm', () => 'AVM')
    .with('1und1', () => '1&1')
    .otherwise(() => 'Unknown');

  return (
    <Slide
      type="success"
      title={Route.options.staticData.title}
      text={mappedBranding}
    />
  );
}

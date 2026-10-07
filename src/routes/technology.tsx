import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { match } from 'ts-pattern';

import { Slide } from '#components/Slide/Slide';

export const Route = createFileRoute('/technology')({
  component: Technology,
  staticData: { title: 'Technology' },
});

function Technology() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const { data } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);
  const technology = data.get('technology');
  const model = data.get('model');

  if (!technology || !model) {
    return (
      <Slide
        type="unavailable"
        title={Route.options.staticData.title}
      />
    );
  }

  const mappedTechnology = match(technology)
    .returnType<string>()
    .with('A', 'B', 'J', 'Q', (value) => `Annex ${value}`)
    // only when "Annex unbekannt" is preceded by a model name that contains "Cable"
    .with(
      'Annex unbekannt',
      () => model.includes('Cable'),
      () => 'Cable (DOCSIS)',
    )
    // else
    .with('Annex unbekannt', () => 'Unknown Annex')
    .with('Cable', 'Kabel', () => 'Cable (DOCSIS)')
    .with('Ohne', () => 'No modem')
    .otherwise(() => 'Unknown');

  return (
    <Slide
      type="success"
      title={Route.options.staticData.title}
      text={mappedTechnology}
    />
  );
}

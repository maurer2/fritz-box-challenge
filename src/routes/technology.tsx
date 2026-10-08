import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { match, P } from 'ts-pattern';

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

  const mappedTechnology = match([technology, model])
    .returnType<string>()
    .with([P.union('A', 'B', 'J', 'Q'), P.any], ([value]) => `Annex ${value}`)
    // if "Annex unbekannt" is preceded by a model name that contains "Cable"
    .with(
      ['Annex unbekannt', P.when((modelValue) => modelValue.includes('Cable'))],
      () => 'Cable (DOCSIS)',
    )
    // else
    .with(['Annex unbekannt', P.any], () => 'Unknown Annex')
    .with([P.union('Cable', 'Kabel'), P.any], () => 'Cable (DOCSIS)')
    .with(['Ohne', P.any], () => 'No modem')
    .otherwise(() => 'Unknown');

  return (
    <Slide
      type="success"
      title={Route.options.staticData.title}
      text={mappedTechnology}
    />
  );
}

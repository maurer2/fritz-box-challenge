/* eslint-disable @typescript-eslint/no-use-before-define */
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { match } from 'ts-pattern';

import { Slide } from '../components/Slide/Slide';

export const Route = createFileRoute('/technology')({
  component: Technology,
});

function Technology() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const {
    data: { technology },
  } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);

  if (!technology) {
    return null;
  }

  const mappedTechnology = match(technology)
    .returnType<string>()
    .with('A', 'B', 'J', 'Q', (value) => `Annex ${value}`)
    .with('Annex unbekannt', () => 'Unknown Annex')
    .with('Cable', () => 'Cable')
    // .with('???', () => 'GPON')
    // .with('???', () => 'XGS GPON')
    // .with('???', () => 'AON')
    .otherwise(() => 'Unknown');

  return <Slide title="Technology" text={mappedTechnology} />;
}

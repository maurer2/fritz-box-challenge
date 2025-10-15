/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { match } from 'ts-pattern';

import { Slide } from '../components/Slide';

export const Route = createFileRoute('/technology')({
  component: Technology,
});

const getMappedTechnology = (technology: string): string =>
  match(technology)
    .returnType<string>()
    .with('A', 'B', 'J', 'Q', (value) => `Annex ${value}`)
    .with('Annex unbekannt', () => 'Unknown Annex')
    .with('Cable', () => 'Cable')
    // .with('???', () => 'GPON')
    // .with('???', () => 'XGS GPON')
    // .with('???', () => 'AON')
    .otherwise(() => 'Unknown');

function Technology() {
  const { fetchBoxDataQueryOptions } = Route.useRouteContext();
  const {
    data: { technology },
  } = useSuspenseQuery(fetchBoxDataQueryOptions);

  const mappedTechnology = getMappedTechnology(technology);

  return (
    <div className="view-transition">
      <Slide title="Technology" text={mappedTechnology} />
    </div>
  );
}

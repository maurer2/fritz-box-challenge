/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { match } from 'ts-pattern';

import { Slide } from '../components/Slide';

export const Route = createFileRoute('/branding')({
  component: Branding,
});

const getMappedBranding = (branding: string): string =>
  match(branding)
    .returnType<string>()
    .with('avm', () => 'AVM')
    .with('1und1', () => '1&1')
    .otherwise(() => 'Unknown');

function Branding() {
  const { fetchBoxDataQueryOptions } = Route.useRouteContext();
  const {
    data: { branding },
  } = useSuspenseQuery(fetchBoxDataQueryOptions);

  const mappedBranding = getMappedBranding(branding);

  return <Slide title="Branding" text={mappedBranding} />;
}

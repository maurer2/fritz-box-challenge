/* eslint-disable @typescript-eslint/no-use-before-define */
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { match } from 'ts-pattern';

import { Slide } from '../components/Slide/Slide';

export const Route = createFileRoute('/language')({
  component: Branding,
});

function Branding() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const {
    data: { language },
  } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);

  if (!language) {
    return null;
  }

  const languageName = match(language)
    .with('de', () => 'German')
    .with('en', () => 'English')
    .with('fr', () => 'French')
    .with('it', () => 'Italian')
    .with('nl', () => 'Dutch')
    .with('pl', () => 'Polish')
    .with('es', () => 'Spanish')
    .otherwise(() => 'Unknown');

  return <Slide title="Language" text={languageName} />;
}

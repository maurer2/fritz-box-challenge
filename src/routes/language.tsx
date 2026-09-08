import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { match } from 'ts-pattern';

import { Slide } from '#components/Slide/Slide';

export const Route = createFileRoute('/language')({
  component: Branding,
  staticData: { title: 'Language' },
});

function Branding() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const { data } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);
  const language = data.get('language');

  if (!language) {
    return (
      <Slide
        type="unavailable"
        title={Route.options.staticData.title}
      />
    );
  }

  // list of supported languages: https://hilfe.o2online.de/testberichte-reviews-9/avm-fritz-box-7530-international-version-multi-language-support-516517
  const languageName = match(language)
    .returnType<string>()
    .with('de', () => 'German')
    .with('en', () => 'English')
    .with('fr', () => 'French')
    .with('it', () => 'Italian')
    .with('nl', () => 'Dutch')
    .with('pl', () => 'Polish')
    .with('es', () => 'Spanish')
    .otherwise(() => 'Unknown');

  return (
    <Slide
      type="success"
      title={Route.options.staticData.title}
      text={languageName}
    />
  );
}

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Slide } from '../components/Slide/Slide';

export const Route = createFileRoute('/model')({
  component: Model,
  staticData: { title: 'Model' },
});

function Model() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const { data } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);
  const model = data.get('model');

  if (!model) {
    return null;
  }

  const modelWithoutBranding = model.replace('(UI)', ''); // 1und1 branding

  return (
    <Slide
      title={Route.options.staticData?.title ?? ''}
      text={modelWithoutBranding}
    />
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Slide } from '../components/Slide/Slide';

export const Route = createFileRoute('/model')({
  component: Model,
});

function Model() {
  const { getStatusFieldsFromBoxQueryOptions } = Route.useRouteContext();
  const { data } = useSuspenseQuery(getStatusFieldsFromBoxQueryOptions);
  const model = data.get('model');

  if (!model) {
    return null;
  }

  const modelWithoutBranding = model.replace('(UI)', ''); // 1und1 branding

  return <Slide title="Model" text={modelWithoutBranding} />;
}

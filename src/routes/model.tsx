/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Slide } from '../components/Slide';

export const Route = createFileRoute('/model')({
  component: Model,
});

function Model() {
  const { fetchBoxDataQueryOptions } = Route.useRouteContext();
  const {
    data: { model },
  } = useSuspenseQuery(fetchBoxDataQueryOptions);

  const modelWithoutBranding = model.replace('(UI)', ''); // 1und1 branding

  return (
    <div className="view-transition">
      <Slide title="Model" text={modelWithoutBranding} />
    </div>
  );
}

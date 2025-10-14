/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/technology')({
  component: Technology,
});

function Technology() {
  const { fetchBoxDataQueryOptions } = Route.useRouteContext();
  const { data: boxData } = useSuspenseQuery(fetchBoxDataQueryOptions);

  return (
    <>
      <h1>Technology</h1>
      <pre>{JSON.stringify(boxData)}</pre>
    </>
  );
}

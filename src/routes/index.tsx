/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const context = Route.useRouteContext();

  const globalFetch = context.fetchBoxData;

  globalFetch();
  return <h1>Welcome Home!</h1>;
}

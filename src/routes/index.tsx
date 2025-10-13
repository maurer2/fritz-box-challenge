/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
  loader: async ({ context }) => context.getBoxData(),
  pendingComponent: () => <p>Loading box data</p>,
});

function Index() {
  const posts = Route.useLoaderData();

  return (
    <>
      <h1>Home</h1>

      {typeof posts === 'string' ? <pre>{posts}</pre> : null}
    </>
  );
}

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/branding')({
  component: Branding,
  loader: async ({ context }) => context.getBoxData(),
  pendingComponent: () => <p>Loading box data</p>,
});

function Branding() {
  const posts = Route.useLoaderData();

  return (
    <>
      <h1>Branding</h1>

      {typeof posts === 'string' ? <pre>{posts}</pre> : null}
    </>
  );
}

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/branding')({
  component: Branding,
  loader: ({ context }) => ({
    boxData: context.boxData,
  }),
});

function Branding() {
  const { boxData } = Route.useLoaderData();

  return (
    <>
      <h1>Branding</h1>

      {boxData !== null ? <pre>{boxData}</pre> : null}
    </>
  );
}

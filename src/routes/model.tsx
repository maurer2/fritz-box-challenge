/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/model')({
  component: Model,
  loader: ({ context }) => ({
    boxData: context.boxData,
  }),
});

function Model() {
  const { boxData } = Route.useLoaderData();

  return (
    <>
      <h1>Model</h1>

      {boxData !== null ? <pre>{boxData}</pre> : null}
    </>
  );
}

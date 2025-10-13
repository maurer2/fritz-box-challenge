/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
  loader: ({ context }) => ({
    boxData: context.boxData,
  }),
});

function Index() {
  const { boxData } = Route.useLoaderData();

  return (
    <>
      <h1>Home</h1>

      {boxData !== null ? <pre>{boxData}</pre> : null}
    </>
  );
}

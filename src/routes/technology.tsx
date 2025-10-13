/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/technology')({
  component: Technology,
});

function Technology() {
  return <h1>Technology</h1>;
}

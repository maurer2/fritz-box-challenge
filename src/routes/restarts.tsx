/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/restarts')({
  component: Restarts,
});

function Restarts() {
  return <h1>Restarts</h1>;
}

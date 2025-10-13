/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/power-on-hours')({
  component: PowerOnHours,
});

function PowerOnHours() {
  return <h1>PowerOnHours</h1>;
}

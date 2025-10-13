/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/firmware')({
  component: Firmware,
});

function Firmware() {
  return <h1>Firmware</h1>;
}

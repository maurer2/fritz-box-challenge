/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/branding')({
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: Branding,
});

function Branding() {
  return <h1>Branding</h1>;
}

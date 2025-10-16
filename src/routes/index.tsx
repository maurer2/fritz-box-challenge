/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => <Navigate to="/model" />,
});

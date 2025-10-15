/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute, Navigate } from '@tanstack/react-router';
// import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/')({
  component: () => <Navigate to="/model" />,
  // pendingComponent: () => <p>Loading box data 2</p>, // shouldn't be visible as non stale data is already in query cache when component loads
});

// function Index() {
//   const { fetchBoxDataQueryOptions } = Route.useRouteContext();
//   const { data: boxData } = useSuspenseQuery(fetchBoxDataQueryOptions);

//   return (
//     <div className="view-transition">
//       <h1>Home</h1>
//       <pre>{JSON.stringify(boxData)}</pre>
//     </div>
//   );
// }

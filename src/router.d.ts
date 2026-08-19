import '@tanstack/react-router';

declare module '@tanstack/react-router' {
  // https://tanstack.com/router/latest/docs/guide/static-route-data#enforcing-static-data
  interface StaticDataRouteOption {
    title: string;
  }
}

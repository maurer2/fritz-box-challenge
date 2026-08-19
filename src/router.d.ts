import '@tanstack/react-router';

declare module '@tanstack/react-router' {
  // https://tanstack.com/router/latest/docs/guide/static-route-data#enforcing-static-data
  interface StaticDataRouteOption {
    // optional as not every root needs a title
    title?: string;
  }
}

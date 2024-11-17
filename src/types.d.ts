declare module '*';

declare module 'virtual:box-data' {
  const boxData: sting;

  export default boxData;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

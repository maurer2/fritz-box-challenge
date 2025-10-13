import React, { useState, useMemo } from 'react';
import { RouterProvider } from '@tanstack/react-router';

import { router } from '../index';

const App2 = () => {
  const [hasBoxData, setHasBoxData] = useState(false);
  const contextValue = useMemo(
    () => ({
      hasBoxData,
      setHasBoxData,
    }),
    [hasBoxData],
  );

  return <RouterProvider router={router} context={contextValue} />;
};

export default App2;

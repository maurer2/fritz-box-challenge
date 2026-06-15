// oxlint-disable no-unused-vars
import { useEffect, useRef } from 'react';

const useAccessRefsDuringRender = (value: unknown) => {
  const ref = useRef<unknown>(null);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

// oxlint-disable no-unused-vars
import { useEffect, useRef, useState } from 'react';

const useAccessRefsDuringRender = (value: unknown) => {
  const ref = useRef<unknown>(null);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

const useIncorrectDependencyArray = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    console.log(name);
  }, []);
};

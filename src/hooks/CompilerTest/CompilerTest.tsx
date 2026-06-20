// oxlint-disable no-unused-vars
// oxlint-disable react/no-multi-comp, react/only-export-components
import { useEffect, useRef, useState, type Ref } from 'react';

const useAccessRefDuringRender = (value: unknown) => {
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

const ChildComponent = ({ ref }: { ref?: Ref<HTMLDivElement> }) => <div ref={ref}>Test</div>;
const AccessCallbackRefDuringRender = () => {
  const [offset, setOffset] = useState<number | null>(null);

  const callbackRefs = {
    test: (element: HTMLElement | null) => {
      if (!element) {
        return;
      }

      setOffset(element.getBoundingClientRect().top);
    },
    test2: (element: HTMLElement | null) => element?.focus(),
  };
  // oxlint-disable-next-line unicorn/consistent-function-scoping
  const callbackRef = (element: HTMLElement | null) => element?.focus();

  console.log(offset);

  return (
    <>
      {/* Error - Cannot access refs during render */}
      <ChildComponent ref={callbackRefs.test} />
      {/* No error */}
      <ChildComponent ref={callbackRef} />
    </>
  );
};

import 'react';

declare module 'react' {
  interface CSSProperties {
    [index: `--${string}`]: string | number | null | undefined;
  }
}

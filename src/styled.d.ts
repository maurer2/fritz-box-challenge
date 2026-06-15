import 'styled-components';
import type { Theme } from './components/Theme/tokens';

declare module 'styled-components' {
  // oxlint-disable-next-line typescript/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}

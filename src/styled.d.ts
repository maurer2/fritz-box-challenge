import 'styled-components';
import type { Theme } from './components/Theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

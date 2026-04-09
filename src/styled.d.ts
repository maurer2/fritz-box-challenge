import 'styled-components';
import type { ThemeType } from './components/Theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

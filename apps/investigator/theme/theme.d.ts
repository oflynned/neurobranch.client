import { lightTheme } from './light.theme';

type ThemeInterface = typeof lightTheme;

declare module 'styled-components' {
  // eslint-disable-next-line
  interface DefaultTheme extends ThemeInterface {}
}

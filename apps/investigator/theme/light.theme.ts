export type Dimension = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

const size: Record<Dimension, number> = {
  xs: 0.875,
  sm: 1,
  md: 1.125,
  lg: 1.25,
  xl: 1.875,
  xxl: 2,
  xxxl: 2.5,
};

const spacing: Record<Dimension, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 64,
};

const shadows = {
  default: 'rgba(100, 100, 111, 0.2)',
};

const palette = {
  buttonBlue: '#279AF1',
  redEye: '#DD1155',
  squashBlossom: '#FBB13C',
  acapulcoCliffs: '#4F9EA8',
  littleMermaid: '#2C404A',
  dugong: '#707070',
  pelicanBay: '#9BAAB2',
  fortressGrey: '#B7B7B7',
  orochimaru: '#D9D9D9',
};

const typography: Record<Dimension, { size: string; height: string }> = {
  xs: { size: `${size.xs}rem`, height: `${size.xs * 1.5}rem` },
  sm: { size: `${size.sm}rem`, height: `${size.sm * 1.5}rem` },
  md: { size: `${size.md}rem`, height: `${size.md * 1.5}rem` },
  lg: { size: `${size.lg}rem`, height: `${size.lg * 1.5}rem` },
  xl: { size: `${size.xl}rem`, height: `${size.xl * 1.5}rem` },
  xxl: { size: `${size.xxl}rem`, height: `${size.xxl * 1.5}rem` },
  xxxl: { size: `${size.xxxl}rem`, height: `${size.xxxl * 1.5}rem` },
};

const theme = {
  primary: palette.buttonBlue,
  secondary: palette.redEye,
  textPrimary: palette.littleMermaid,
  textSecondary: palette.pelicanBay,
  shadow: 'rgba(100, 100, 111, 0.2)',
  border: palette.orochimaru,
};

// TODO split this into a base theme to keep a distinction between
//      colours vs common theme items that won't change in dark mode
export const lightTheme = {
  fonts: {
    primary: 'Lato',
    secondary: 'Roboto',
    fallback: 'sans-serif',
  },
  border: {
    solid: `1px solid ${theme.border}`,
  },
  shadow: {
    lg: `${shadows.default} 0 0 ${spacing.lg}px 0`,
    xl: `${shadows.default} 0 0 ${spacing.xl}px 0`,
    xxl: `${shadows.default} 0 0 ${spacing.xxl}px 0`,
  },
  palette: {
    ...palette,
  },
  colours: {
    ...theme,
  },
  size: {
    ...size,
  },
  spacing: {
    ...spacing,
  },
  typography: {
    ...typography,
  },
};

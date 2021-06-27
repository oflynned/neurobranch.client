import { HTMLAttributes } from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { Dimension } from '../../../theme/light.theme';

export type Fill = 'FILL_PARENT' | 'WRAP_CONTENT';

type Spatiality = {
  all?: Dimension;
  top?: Dimension;
  right?: Dimension;
  bottom?: Dimension;
  left?: Dimension;
};

export const getSpacing = (
  theme: DefaultTheme,
  spatiality?: Spatiality,
): string => {
  if (!spatiality) {
    return '0';
  }

  if (spatiality.all) {
    return theme.spacing[spatiality.all] + 'px';
  }

  return [
    spatiality.top ? theme.spacing[spatiality.top] : 0,
    spatiality.right ? theme.spacing[spatiality.right] : 0,
    spatiality.bottom ? theme.spacing[spatiality.bottom] : 0,
    spatiality.left ? theme.spacing[spatiality.left] : 0,
  ]
    .join('px ')
    .trim();
};

export type BaseProps = HTMLAttributes<HTMLDivElement> & {
  margin?: Spatiality;
  padding?: Spatiality;
  fill?: Fill;
  maxWidth?: string;
  width?: string;
  maxHeight?: string;
  height?: string;
  centre?: boolean;
};

export const BaseView = styled.div<BaseProps>(
  ({
    theme,
    margin,
    padding,
    fill,
    width,
    maxWidth,
    height,
    maxHeight,
    centre,
  }) => {
    const centred = [
      theme.spacing[margin?.top ?? 'xs'] + 'px',
      'auto',
      theme.spacing[margin?.bottom ?? 'xs'] + 'px',
      'auto',
    ].join(' ');

    const spacing = centre ? centred : getSpacing(theme, margin);

    return css`
      display: flex;
      max-width: ${maxWidth ?? '100%'};
      max-height: ${maxHeight ?? '100%'};
      height: ${height ?? 'auto'};
      width: ${width ?? fill === 'WRAP_CONTENT' ? 'fit-content' : '100%'};
      padding: ${getSpacing(theme, padding)};
      margin: ${spacing};
    `;
  },
);

BaseView.defaultProps = {
  fill: 'WRAP_CONTENT',
};

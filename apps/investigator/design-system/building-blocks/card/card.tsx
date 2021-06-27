import styled, { css } from 'styled-components';
import { BaseProps, BaseView } from '../view';
import { getSpacing } from '../view/view';

interface Props extends BaseProps {
  shadow?: boolean;
}

export const Card = styled(BaseView)<Props>(
  ({ theme, shadow, padding }) => css`
    padding: ${padding ? getSpacing(theme, padding) : theme.spacing.md + 'px'};
    border-radius: ${theme.spacing.xs}px;
    background: white;
    box-shadow: ${shadow ? theme.shadow.lg : 'none'};
    border: ${shadow ? 'none' : `1px solid ${theme.colours.border}`};
  `,
);

Card.defaultProps = {
  shadow: false,
};

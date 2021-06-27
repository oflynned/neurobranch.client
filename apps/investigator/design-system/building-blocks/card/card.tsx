import styled, { css } from 'styled-components';
import { BaseProps, BaseView } from '../view';

interface Props extends BaseProps {
  shadow?: boolean;
}

export const Card = styled(BaseView)<Props>(
  ({ theme, shadow }) => css`
    padding: ${theme.spacing.md}px;
    border-radius: ${theme.spacing.xs}px;
    background: white;
    box-shadow: ${shadow ? theme.shadow.lg : 'none'};
    border: ${shadow ? 'none' : `1px solid ${theme.colours.border}`};
  `,
);

Card.defaultProps = {
  shadow: false,
};

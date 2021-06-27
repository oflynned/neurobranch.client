import { FC } from 'react';
import styled from 'styled-components';
import { BaseProps, BaseView } from '../../view';

type Props = BaseProps;

const Text = styled.p<Props>(
  ({ theme }) => `
  font-weight: normal;
  font-family: ${theme.fonts.primary}, ${theme.fonts.fallback};
  font-size: ${theme.typography.xs.size};
  line-height: ${theme.typography.xs.height};
  color: ${theme.colours.textPrimary};
`,
);

export const Paragraph: FC<Props> = ({ children, ...props }) => (
  <BaseView {...props}>
    <Text>{children}</Text>
  </BaseView>
);

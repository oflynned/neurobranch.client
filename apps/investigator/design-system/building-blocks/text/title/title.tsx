import { FC } from 'react';
import styled from 'styled-components';
import { BaseProps, BaseView } from '../../view';

type Props = BaseProps;

const Text = styled.h1<Props>(
  ({ theme }) => `
  font-weight: bold;
  font-family: ${theme.fonts.primary}, ${theme.fonts.fallback};
  font-size: ${theme.typography.xl.size};
  line-height: ${theme.typography.xl.height};
  color: ${theme.colours.textPrimary};
`,
);

export const Title: FC<Props> = ({ children, ...props }) => (
  <BaseView {...props}>
    <Text>{children}</Text>
  </BaseView>
);

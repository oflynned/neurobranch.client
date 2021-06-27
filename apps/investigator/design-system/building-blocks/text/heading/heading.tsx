import { FC } from 'react';
import styled from 'styled-components';
import { BaseProps, BaseView } from '../../view';

type Props = BaseProps;

const Text = styled.h2<Props>(
  ({ theme }) => `
  font-weight: bold;
  font-family: ${theme.fonts.primary}, ${theme.fonts.fallback};
  font-size: ${theme.typography.md.size};
  line-height: ${theme.typography.md.height};
  color: ${theme.colours.textPrimary};
`,
);

export const Heading: FC<Props> = ({ children, ...props }) => (
  <BaseView {...props}>
    <Text>{children}</Text>
  </BaseView>
);

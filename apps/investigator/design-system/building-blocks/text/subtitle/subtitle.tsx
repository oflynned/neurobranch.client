import { FC } from 'react';
import styled from 'styled-components';
import { BaseProps, BaseView } from '../../view';

type Props = BaseProps;

const Text = styled.h2<Props>(
  ({ theme }) => `
  font-weight: bold;
  font-family: ${theme.fonts.secondary}, ${theme.fonts.fallback};
  font-size: ${theme.typography.sm.size};
  line-height: ${theme.typography.sm.height};
  color: ${theme.colours.textSecondary};
`,
);

export const Subtitle: FC<Props> = ({ children, ...props }) => (
  <BaseView {...props}>
    <Text>{children}</Text>
  </BaseView>
);

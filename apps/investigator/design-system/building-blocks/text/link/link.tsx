import Link from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';
import { BaseProps } from '../../view';

interface Props extends BaseProps {
  href?: string;
}

const Text = styled.a<Props>(
  ({ theme }) => `
  font-weight: normal;
  font-family: ${theme.fonts.primary}, ${theme.fonts.fallback};
  font-size: ${theme.typography.xs.size};
  line-height: ${theme.typography.xs.height};
  color: ${theme.colours.textAccent};
  
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`,
);

export const HrefLink: FC<Props> = ({ children, href }) => {
  return (
    <Link href={href}>
      <Text>{children}</Text>
    </Link>
  );
};

import Image from 'next/image';
import { FC } from 'react';
import styled from 'styled-components';
import { Paragraph } from '../text';
import { BaseProps, BaseView } from '../view';

interface Props extends BaseProps {
  icon?: string;
  iconDescription?: string;
  text?: string;
  onClick?: () => Promise<void> | void;
}

const Layout = styled.button(
  ({ theme }) => `
  display: flex;
  width: 100%;
  background-color: white;
  border: 1px solid ${theme.colours.border};
  padding: ${theme.spacing.xs}px ${theme.spacing.lg}px;
  border-radius: ${theme.spacing.xs}px;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${theme.shadow.sm};
  }
`,
);

export const Button: FC<Props> = (props) => {
  const { text, icon, iconDescription, onClick } = props;

  return (
    <BaseView {...props}>
      <Layout onClick={onClick}>
        {icon && (
          <Image src={icon} alt={iconDescription} width={24} height={24} />
        )}
        {text && <Paragraph>{text}</Paragraph>}
      </Layout>
    </BaseView>
  );
};

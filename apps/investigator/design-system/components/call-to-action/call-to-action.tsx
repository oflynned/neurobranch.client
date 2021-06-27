import Image from 'next/image';
import { FC } from 'react';
import styled from 'styled-components';
import { Card, Heading, Paragraph } from '../../building-blocks';

type CallToActionProps = {
  title: string;
  subtitle: string;
  images: {
    src: string;
    alt: string;
  }[];
};

const Layout = styled.div`
  justify-content: center;
  align-items: center;
  display: inline-flex;
`;

const BackgroundCard = styled(Card)(
  ({ theme }) => `
  border-radius: ${theme.spacing.sm}px;
  z-index: 0;
`,
);

const ForegroundCard = styled(Card)(
  ({ theme }) => `
  border-radius: ${theme.spacing.sm}px;
  z-index: 10;
  margin-left: -15%;
  margin-top: 50%;
`,
);

export const CallToAction: FC<CallToActionProps> = ({
  title,
  subtitle,
  images,
}) => {
  const [foreground, background] = images;

  return (
    <>
      <Layout>
        <BackgroundCard shadow>
          <Image
            src={background.src}
            alt={background.alt}
            width={192}
            height={192}
          />
        </BackgroundCard>

        <ForegroundCard shadow>
          <Image
            src={foreground.src}
            alt={foreground.alt}
            width={192}
            height={192}
          />
        </ForegroundCard>
      </Layout>
      <Heading centre margin={{ top: 'xl' }}>
        {title}
      </Heading>
      <Paragraph>{subtitle}</Paragraph>
    </>
  );
};

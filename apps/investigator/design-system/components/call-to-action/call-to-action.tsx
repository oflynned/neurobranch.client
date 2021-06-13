import { FC } from 'react';
import { Card, Heading, Paragraph } from '../../building-blocks';
import Image from 'next/image';

import styles from './style.module.scss';

type CallToActionProps = {
  title: string;
  subtitle: string;
  images: {
    src: string;
    alt: string;
  }[];
};

export const CallToAction: FC<CallToActionProps> = ({
  title,
  subtitle,
  images,
}) => {
  const [foreground, background] = images;

  return (
    <div className={styles.callToAction}>
      <div className={styles.cards}>
        <Card>
          <Image
            src={background.src}
            alt={background.alt}
            width={192}
            height={192}
          />
        </Card>

        <div className={styles.card}>
          <Card>
            <Image
              src={foreground.src}
              alt={foreground.alt}
              width={192}
              height={192}
            />
          </Card>
        </div>
      </div>
      <div className={styles.heading}>
        <Heading>{title}</Heading>
      </div>
      <div className={styles.description}>
        <Paragraph>{subtitle}</Paragraph>
      </div>
    </div>
  );
};

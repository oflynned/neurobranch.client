import Head from 'next/head';
import { FC } from 'react';

type Props = {
  title?: string;
};

export const Page: FC<Props> = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title ?? 'Neurobranch'}</title>
        <link rel="shortcut icon" href="/static/images/sleuth.png" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </div>
  );
};

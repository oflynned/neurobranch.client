const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

module.exports = {
  sassOptions: {
    includedPaths: [path.join(__dirname, 'styles')],
  },
  ...withPlugins([
    [
      withNx,
      {
        nx: {
          // Set this to false if you do not want to use SVGR
          // See: https://github.com/gregberge/svgr
          svgr: true,
        },
      },
    ],
    withImages,
  ]),
};

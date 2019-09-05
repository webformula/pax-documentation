import { build } from '@webformula/pax-core';

build({
  rootFolder: 'app',
  pagesFolder: 'pages',
  layoutFilePath: 'app/layout/index.js',
  distFolder: 'dist',
  routeConfig: {
    root: 'Introduction',
    fourOFour: 'FourOFour'
  }
});

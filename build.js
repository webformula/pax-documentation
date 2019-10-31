import { build } from '@webformula/pax-core';

build({
  rootFolder: 'app',
  pagesFolder: 'pages',
  layoutFilePath: 'app/layout/index.js',
  distFolder: 'dist',
  routerConfig: {
    root: 'introduction',
    fourOFour: 'fourOFour'
  },
  copyFiles: [
    {
      from: 'public/**',
      to: ''
    }
  ]
});

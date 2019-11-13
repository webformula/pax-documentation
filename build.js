import { build } from '@webformula/pax-core';

build({
  rootFolder: 'app',
  pagesFolder: 'pages',
  layoutFilePath: 'app/layout/index.js',
  distFolder: 'build',
  cacheBust: true,
  routerConfig: {
    root: 'introduction',
    fourOFour: 'fourOFour'
  },
  copyFiles: [
    {
      from: 'app/public/**',
      to: 'dist/'
    }
  ]
});

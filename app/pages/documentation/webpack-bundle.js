import { Page, html } from '@webformula/pax-core';

export default class WebpackPage extends Page {
  get title() {
    return 'Webpack bundling';
  }

  template() {
    return html`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h2>Bundle with Webpack</h2>
          <p>PAX-core was designed to be easily bundled</p>
        </article>

        <h6 style="padding-left:24px;">Quick links</h6>
        <ul>
          <li><anchor-link selector="#webpack" offset="56px">Webpack config</anchor-link></li>
          <li><anchor-link selector="#build-scripts" offset="56px">Build scripts</anchor-link></li>
          <li><a href="https://github.com/webformula/pax-example-webpack-bundle" target="_new">Github: Example app</a></li>
        </ul>

        <article class="sub-article" id="webpack">
          <h4>Webpack config</h4>
          <p>The entry.js file will exist in you dist folder</p>
          <p>You can use the index.html file in the dist folder with the newly created webpack bundled entry.js file</p>
          <code-mirror mode="javascript">
              const path = require('path');
              const webpack = require('webpack');

              const distFolder = 'build';
              const cwd = process.cwd();

              module.exports = {
                entry: {
                  'entry.js': \`./\${distFolder}/entry.js\`
                },

                output: {
                  filename: '[name]',
                  path: path.resolve(__dirname, 'dist')
                },

                resolve: {
                  alias: {
                    '/@webformula/pax-core/index.js': path.resolve(cwd, \`\${distFolder}/@webformula/pax-core/index.js\`)
                  }
                }
              };
          </code-mirror>
        </article>

        <article class="sub-article" id="build-scripts">
          <h4>Build Script</h4>
          <p>PAX-core will build the files to the "build" folder, and webpack will bundle them in the "dist" folder</p>
          <code-mirror mode="javascript">
              // build.js
              import { build } from '@webformula/pax-core';

              build({
                rootFolder: 'app',
                pagesFolder: 'pages',
                layoutFilePath: 'app/layout/index.js',
                distFolder: 'build',
                routerConfig: {
                  root: 'introduction',
                  fourOFour: 'fourOFour'
                }
              });


              // package.json scripts section
              "scripts": {
                "build": "node --experimental-modules build.js && npm run package",
                "package": "webpack --config webpack.config.js && cp build/index.html dist/"
              }
          </code-mirror>
        </article>

        <section>
          <a class="button" href="#/documentation/web-components">Next: Web components</a>
        </section>
      </article>
    `;
  }
}

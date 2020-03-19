import { Page } from '@webformula/pax-core';

export default class WebpackPage extends Page {
  get title() {
    return 'Webpack bundling';
  }

  template() {
    return /* html */`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h2>Routing</h2>
          <p>PAX-core has a built in router that is simple to use</p>
        </article>

        <article class="sub-article" id="webpack">
          <h4>Webpack config</h4>
          <p>Packege your app form a single entry point</p>
          <monaco-editor language="javascript">
            const path = require('path');
            const cwd = process.cwd();

            module.exports = {
              entry: {
                'pax-entry.js': './app/pax-entry.js'
              },

              output: {
                filename: '[name]',
                path: path.resolve(__dirname, 'dist'),
              },

              resolve: {
                alias: {
                  '/@webformula/pax-core': path.resolve(cwd, 'dist/@webformula/pax-core')
                }
              },

              mode: 'development',
              devtool: 'inline-source-map'
            };
          </monaco-editor>
        </article>
      </article>
    `;
  }
}

import { Page } from '@webformula/pax-core';

export default class Buildingapp extends Page {
  get title() {
    return 'Building entry';
  }

  template() {
    return /* html */`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="sub-article" id="create-our-fist-page">
          <h4>buildEntry file</h4>
          <p>Auto generate pax-entry.js file. This will load your pages and components, and setup the router</p>

          <p class="direction">file <b>/buildEntry.js</b></p>
          <monaco-editor language="javascript">
            import { buildEntry } from '@webformula/pax-core/src/buildEntry.js';

            buildEntry({
              // root app folder
              rootFolder: 'app',

              // pages folder path relative to root folder
              pagesFolder: 'pages',

              // configure routes
              //   routes can also be configures directly in the page classes
              routeConfig: {
                root: 'HelloWorld' // page class name

                // 404 not found pages
                fourOFour: 'fourOFour.js'
              },


              // --- optional ---

              // change the core path for pax-core. This can help with some local builds
              paxCorePath: '@webformula/pax-core',
              
              // change the entry file name that is generated
              entryFilePath: 'pax-entry.js',

              // build template cache to make pages load faster. This is defaulted to false
              templateFile: true,

              // file path for template cache
              templateFilePath: 'pax-template.js'
            });
          </monaco-editor>
        </article>

        <section>
          <a class="button" href="#/documentation/webpack-bundle">Next: Webpack bundling</a>
        </section>
      </article>
    `;
  }
}

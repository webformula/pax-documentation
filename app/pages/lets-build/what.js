import { Page, html } from '@webformula/pax-core';

export default class What extends Page {
  get title() {
    return 'What we will build';
  }

  template() {
    return html`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h2>Lets build!</h2>
          <p>This tutorial will walk you through building a simple site with 2 pages and a component.</p>

          <h6 style="padding-left:24px;">links</h6>
          <ul>
            <li><anchor-link selector="#structure" offset="56px">Project structure</anchor-link></li>
            <li><anchor-link selector="#build" offset="56px">Build script</anchor-link></li>
            <li><a href="https://github.com/webformula/pax-documentation-example">Github repo<a></li>
            <li><a href="#/lets-build/layout">Next: Lets build - 2. Layout</a></li>
          </ul>
        </article>


        <article class="sub-article" id="structure">
          <h4>Project structure</h4>
          <monaco-editor language="yaml">
              app/
                layout/
                  index.js
                  header.js
                  navigation.js
                pages/
                  hello-world.js
              build.js
              package.json
          </monaco-editor>
        </article>

        <article class="sub-article" id="build">
          <h4>Build script</h4>
          <div class="direction">create file: <b>build.js</b></div>
          <monaco-editor language="javascript">
              import { build } from '@webformula/pax-core';

              build({
                rootFolder: 'app',
                pagesFolder: 'pages', // folder is assumed to be in rootFolder
                layoutFilePath: 'app/layout/index.js',
                distFolder: 'dist',
                routeConfig: {
                  root: 'home', // page class name
                  fourOFour: 'fourOFour'
                }
              });
          </monaco-editor>
        </article>

        <a class="button" href="#/lets-build/layout">Next: Lets build - 2. Layout</a>
      </article>
    `;
  }
}

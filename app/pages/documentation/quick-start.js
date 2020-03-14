import { Page } from '@webformula/pax-core';

export default class GettingStarted extends Page {
  get title() {
    return 'Getting started';
  }

  afterRender() {
      document.querySelector('#indexhtml-editor').content = `
        <!doctype html>
        <html lang='en'>
          <head>
            <meta http-equiv="Cache-Control" content="no-store" />
            <title></title>
            <script src="pax-entry.js" type="module"></script>
          </head>
          <body>
            <!-- this is needed for the router -->
            <page-container></page-container>
          </body>
        </html>
      `;
  }

  template() {
    return /* html */`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h2>Quick Start guide</h2>
          <p>Lets build a small site</p>
        </article>

        <h6 style="padding-left:24px;">Quick links</h6>
        <ul>
          <li><anchor-link selector="#structure" offset="56">Project structure</anchor-link></li>
          <li><anchor-link selector="#installation" offset="56">Installation</anchor-link></li>
          <li><anchor-link selector="#webpack" offset="56">webpack</anchor-link></li>
          <li><anchor-link selector="#package-scripts" offset="56">Package.json scrips</anchor-link></li>
          <li><anchor-link selector="#entry" offset="56">entry</anchor-link></li>
          <li><anchor-link selector="#create-our-fist-page" offset="56">Create our fist page</anchor-link></li>
          <li><anchor-link selector="#indexhtml" offset="56">Create index.html</anchor-link></li>
          <li><anchor-link selector="#lets-run-it" offset="56">Lets run it</anchor-link></li>
          <li><a href="/documentation/pages">Next: Building pages</a></li>
        </ul>

        <article class="sub-article" id="a-quick-note">
          <h4>A quick note</h4>
          <p>
            If you looking for a real world example, you can check out the repo for this website. The PAX documentation website is built using itself. <a href="https://github.com/pacts-org/pacts-documentation" target="new">GitHub Repo</a>
          </p>
        </article>

        <article class="sub-article" id="structure">
          <h4>Project structure</h4>
          <monaco-editor language="yaml">
            app/
              pages/
                helloWorld.js
              pax-entry.js
              index.html
            webpack.config.cjs
            package.json
          </monaco-editor>
        </article>

        <article class="sub-article" id="installation">
          <h4>Installation</h4>
          <p>You can install pax-core through NPM</p>
          <monaco-editor language="shell">
            <code>
              // The only required package
              npm i @webformula/pax-core --save

              // install these to get a full development environment started
              //    you will need these for this quickstart
              npm i http-server nodemon webpack webpack-cli --save-dev
            </code>
          </monaco-editor>
        </article>

        <article class="sub-article" id="webpack">
          <h4>Webpack</h4>
          <p class="direction">Create webpack config <b>app/webpack.config.cjs</b></p>
          <monaco-editor language="javascript">
            <code>
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
            </code>
          </monaco-editor>
        </article>

        <article class="sub-article" id="package-scripts">
          <h4>Package.json scrips</h4>

          <monaco-editor language="json">
            <code>
              {
                "scripts": {
                  "start": "nodemon --watch app --exec \\"npm run package\\" & npm run serve",
                  "serve": "http-server dist/ -p 8080",
                  "package": "webpack --config webpack.config.cjs"
                }
              }
            </code>
          </monaco-editor>
        </article>

        <article class="sub-article" id="entry">
          <h4>pax-entry.js</h4>
          <p>Entry point to out app. Load pages, components, and modules here</p>
          <monaco-editor language="javascript">
            <code>
              import { router } from '@webformula/pax-core';
              import HelloWorld from './pages/helloWorld.js';

              router.addPageClass(HelloWorld, 'helloWorld');
              router.setRoot('HelloWorld');
              router.init();
              window.router = router;
            </code>
          </monaco-editor>
        </article>

        <article class="sub-article" id="create-our-fist-page">
          <h4>Create our fist page</h4>

          <p class="direction">Create page file <b>app/pages/helloWorld.js</b></p>
          <monaco-editor language="javascript">
            import { Page } from '@webformula/pax-core';

            export default class HelloWorld extends Page {
              constructor() {
                super();

                // interact with route parameters ('route/:parameter')
                this.routerParameters = router.getUrlParameters();
                this.routeParamterIs = router.getUrlParameter('id');
              }

              // page title. This returns from the page.build() method
              get title() {
                return 'Hello World';
              }

              // add page routes
              // The page will have a default route of its folder location. ('HelloWorld')
              static get routes() {
                return [
                  // route with parameter
                  'home/:id',
                  'two'
                ]
              }

              /* onclick() method is made available on the element
                * you can access the pages methods by using 'activePage' in the html
                */
              onclick() {
                alert('clicked');
              }

              // optional css
              styles() {
                return \`
                  body {
                    margin: 0;
                  }
                \`;
              }

              template() {
                return \`
                  <h2>Hello World</h2>
                  <button onclick="activePage.onclick()">click me</button>
                \`;
              }
            }
          </monaco-editor>
        </article>

        <article class="sub-article" id="indexhtml">
          <h4>Create index html</h4>
          <p class="direction">Create index html <b>app/index.html</b></p>
          <monaco-editor language="html" id="indexhtml-editor"></monaco-editor>
        </article>

        <article class="sub-article" id="lets-run-it">
          <h4>Lets run it</h4>
          <p>You no have a fully functional site!</p>
          <monaco-editor language="shell">
            <code>
              node start
            </code>
          </monaco-editor>
          <div class="direction">Navigate to <a href="http://localhost:3001" target="_blank">http://localhost:3001</a></div>
        </article>

        <section>
          <a class="button" href="#/documentation/routing">Next: Routing</a>
        </section>
      </article>
    `;
  }
}

import { Page, html } from '@webformula/pax-core';

export default class GettingStarted extends Page {
  get title() {
    return 'Getting started';
  }

  template() {
    return html`
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
          <li><anchor-link selector="#create-our-fist-page" offset="56">Create our fist page</anchor-link></li>
          <li><anchor-link selector="#create-layout" offset="56">Create layout</anchor-link></li>
          <li><anchor-link selector="#create-build-script" offset="56">Create build script</anchor-link></li>
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
                hello-world.js
              layout.js
            build.js
            package.json
          </monaco-editor>
        </article>

        <article class="sub-article" id="installation">
          <h4>Installation</h4>
          <p>You can install pax-core through NPM</p>
          <monaco-editor language="shell">
            <code>
              npm i @webformula/pax-core --save
            </code>
          </monaco-editor>
        </article>

        <article class="sub-article" id="create-our-fist-page">
          <h4>Create our fist page</h4>

          <p class="direction">Create page file <b>app/pages/hello-world.js</b></p>
          <monaco-editor language="javascript">
              import { Page, html } from '@webformula/pax-core';

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
                  return html\`
                    <h2>Hello World</h2>
                    <button onclick="activePage.onclick()">click me</button>
                  \`;
                }
              }
          </monaco-editor>
        </article>

        <article class="sub-article" id="create-layout">
          <h4>Create layout</h4>
          <p>We are simply using a function with a template string to produce a page layout</p>

          <p class="direction">Create layout file <b>app/layout.js</b></p>
          <monaco-editor language="javascript" content="${`
              import { html } from '@webformula/pax-core';

              export default function ({ head, body, title }) {
                return \`
                  <!doctype html>
                  <html lang='en'>
                    <head>
                      <meta http-equiv='Cache-Control' content='no-store' />
                      <title>\${title}</title>
                      <!-- web-components-node styles and scripts. This includes components -->
                      <link rel='stylesheet' href='pax.css'>
                      <script src='pax.js'></script>
                      \${head}
                    </head>
                    <body>
                      \${body}
                    </body>
                  </html>
                \`;
              }
          `}"></monaco-editor>
        </article>

        <article class="sub-article" id="create-build-script">
          <h4>Create build script</h4>

          <p class="direction">Create build file <b>build.js</b></p>
          <monaco-editor language="javascript">
              import { build } from '@webformula/pax-core';

              build({
                rootFolder: 'app',
                pagesFolder: 'pages', // folder is assumed to be in rootFolder
                layoutFilePath: 'app/layout.js',
                distFolder: 'dist',
                routeConfig: {
                  root: 'HelloWorld' // page class name

                  // 404 not found pages
                  fourOFour: 'fourOFour.js',

                  // custom routes
                  //   pages are routed based on folder structure by default
                  //   use this if you want to add a custom routing path
                  custom: {
                    "some-custom-url": 'page-subfolder(or not)/file.js'
                  }
                },

                // serice worker config
                serviceWorker: {
                  // include the service worker
                  include: true, // default false

                  // This will auto reload the webpage if there is a new build
                  // If you want the user to be incontroll of when to reload then set this to false
                  //    and register a callback with 'window.onNewServiceWorkerAvailable(() => {})';
                  //    the passed in callback will be called when there is a new build
                  //    then you can call 'window.serviceWorkerSkipWaiting()' to reload the page and get the new build
                  autoReload: true, // default true

                  /* CahcedFiles override
                   *   This is not needed, the cached file list will be automatically generated
                   *   this is for overriding
                   *   you can use wild cards and blobs
                  cacheFiles: [
                    'app.css',
                    '**/*.png'
                  ]
                  */
                },

                // copy files from the inside the src folder to the destination folder
                //   These files will be included in the cached files of the service worker
                //   you can use wild cards and blobs
                //   example: app/public/images/one.png -> dist/images/one.png
                copyFiles: [
                  {
                    from: 'app/public/**',
                    to: 'dist/'
                  }
                ]
              });
          </monaco-editor>
        </article>

        <article class="sub-article" id="lets-run-it">
          <h4>Lets run it</h4>
          <p>You no have a fully functional site!</p>
          <monaco-editor language="shell">
            <code>
              node app/build.js
            </code>
          </monaco-editor>
          <div class="direction">Navigate to <a href="http://localhost:3001/hello-world">http://localhost:3001/hello-world</a></div>
        </article>

        <section>
          <a class="button" href="#/documentation/routing">Next: Routing</a>
        </section>
      </article>
    `;
  }
}

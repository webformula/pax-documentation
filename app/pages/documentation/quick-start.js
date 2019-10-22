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
          <code-mirror mode="javascript">
            <code>
              app/
                pages/
                  hello-world.js
                layout.js
              build.js
              package.json
            </code>
          </code-mirror>
        </article>

        <article class="sub-article" id="installation">
          <h4>Installation</h4>
          <p>You can install pax-core through NPM</p>
          <code-mirror mode="html">
            <code>
              npm i @webformula/pax-core --save
            </code>
          </code-mirror>
        </article>

        <article class="sub-article" id="create-our-fist-page">
          <h4>Create our fist page</h4>

          <p class="direction">Create page file <b>app/pages/hello-world.js</b></p>
          <code-mirror mode="javascript">
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
                 * you can access the pages methods by using '$HelloWorld' in the html
                 * the class alias ($HelloWorld) is gerenated based on the class name
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
                    <button onclick="$HelloWorld.onclick()">click me</button>
                  \`;
                }
              }
          </code-mirror>
        </article>

        <article class="sub-article" id="create-layout">
          <h4>Create layout</h4>
          <p>We are simply using a function with a template string to produce a page layout</p>

          <p class="direction">Create layout file <b>app/layout.js</b></p>
          <code-mirror mode="javascript">
              import { html } from '@webformula/pax-core';

              export default function ({ head, body, title }) {

                // There is a problem with my code dislaying certain htmt tags
                // commenting them out temporarally to get around this problem
                return \`
                  <!-- <!doctype html> -->
                  <!-- <html lang="en"> -->
                    <!-- <head> -->
                      <meta http-equiv="Cache-Control" content="no-store" />
                      <title>\${title}</title>
                      <!-- web-components-node styles and scripts. This includes components -->
                      <link rel="stylesheet" href="pax.css">
                      <script src="pax.js"></script>
                      \${head}
                    <!-- </head> -->
                    <!-- <body> -->
                      \${body}
                    <!-- </body> -->
                  <!-- </html> -->
                \`;
              }
          </code-mirror>
        </article>

        <article class="sub-article" id="create-build-script">
          <h4>Create build script</h4>

          <p class="direction">Create build file <b>build.js</b></p>
          <code-mirror mode="javascript">
              import { build } from '@webformula/pax-core';

              build({
                rootFolder: 'app',
                // folder is assumed to be in rootFolder
                pagesFolder: 'pages',
                layoutFilePath: 'app/layout.js',
                distFolder: 'dist',
                routeConfig: {
                  // page class name
                  root: 'HelloWorld'

                  // 404 not fount pages
                  fourOFour: 'fourOFour.js',

                  // custom routes
                  // pages are routed based on folder structure by default
                  // use this if you want to add a custom routing path
                  custom: {
                    "some-custom-url": 'page-subfolder(or not)/file.js'
                  }
                }
              });
          </code-mirror>
        </article>

        <article class="sub-article" id="lets-run-it">
          <h4>Lets run it</h4>
          <p>You no have a fully functional site!</p>
          <code-mirror mode="html">
            <code>
              node app/build.js
            </code>
          </code-mirror>
          <div class="direction">Navigate to <a href="http://localhost:3001/hello-world">http://localhost:3001/hello-world</a></div>
        </article>

        <section>
          <a class="button" href="#/documentation/routing">Next: Routing</a>
        </section>
      </article>
    `;
  }
}

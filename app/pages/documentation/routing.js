import { Page, html } from '@webformula/pax-core';

export default class Routing extends Page {
  get title() {
    return 'Webpack bundling';
  }

  static get routes() {
    return [
      'documentation/routing/:id'
    ];
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
          <li><anchor-link selector="#default-routes" offset="56px">Default routes</anchor-link></li>
          <li><anchor-link selector="#build-config" offset="56px">Build config</anchor-link></li>
          <li><anchor-link selector="#page-routes" offset="56px">Page routes</anchor-link></li>
          <li><anchor-link selector="#router-methods" offset="56px">Router methods</anchor-link></li>
        </ul>


        <article class="sub-article" id="default-routes">
          <h4>Default routes</h4>
          <p>All pages in teh page folder have a default route</p>
          <p>You can add custom routes in 2 different places. Read next sections to find out how</p>
          <monaco-editor language="yaml">
              // Folder structure
                app/
                  pages/
                    home.js
                    subfolder/
                      one.js
                      two.js
                  layout.js
                build.js
                package.json


              // Routes based on pages in folder structure above
              // These routes are added by default
                home: www.site.com/#/home
                subfolder/one: www.site.com/#/subfolder/one
                subfolder/two: www.site.com/#/subfolder/two
          </monaco-editor>
        </article>

        <article class="sub-article" id="build-config">
          <h4>Build config</h4>
          <p>You can configure all or some of your routes in the build config</p>
          <monaco-editor language="javascript">
              import { build } from '@webformula/pax-core';

              build({
                rootFolder: 'app',
                pagesFolder: 'pages',
                layoutFilePath: 'app/layout/index.js',
                distFolder: 'build',
                routerConfig: {
                  // the root page "/"
                  root: 'introduction',

                  // default page when route cannot be resolved 404
                  fourOFour: 'fourOFour',

                  // add any additonal routes here
                  custom: {
                    'anything/anything/': 'page file name and path',

                    // route with parameter
                    'anything/anything/:param': 'page file name and path'
                  }
                }
              });
          </monaco-editor>
        </article>

        <article class="sub-article" id="page-routes">
          <h4>Page config</h4>
          <p>You can configure custom routes in the page itself</p>
          <monaco-editor language="javascript">
              import { Page, html } from '@webformula/pax-core';

              export default class Home extends Page {
                constructor() {
                  super();

                  // interact with route parameters ('route/:parameter')
                  this.routerParameters = router.getUrlParameters();
                  this.routeParamterIs = router.getUrlParameter('id');
                }

                // add page routes
                static get routes() {
                  return [
                    // route with parameter
                    'home/:id',
                    'two'
                  ]
                }
              });
          </monaco-editor>
        </article>


        <article class="sub-article" id="router-methods">
          <h4>Router methods</h4>
          <p>Custom methods to provider functionality not in the browsers</p>
          <monaco-editor language="javascript">
              // --- Url Prarameters ---

              // Get url parameters

              // www.site.com/#/item/:id : www.site.com/#/item/1
              router.getUrlParameters(); // { id: 1 }
              router.getUrlParameter('id'); // 1


              // Get query parameters

              // www.site.com/#/item?id=1
              router.getQueryParameters(); // { id: 1 }
              router.getQueryParameter('id'); // 1

              router.addQueryParameter('one', 1); // www.site.com/#/item?id=1&one=1


              // --- Other route interaction ---

              // for all other route and location interactions you can use the native browser feature

              location.hash = '/home'; // navigate home: www.site.com/#/home
              location.href; // http://www.site.com/#/home
              router.current; // http://www.site.com/#/home
          </monaco-editor>
        </article>

        <section>
          <a class="button" href="#/documentation/web-components">Next: Web components</a>
        </section>
      </article>
    `;
  }
}

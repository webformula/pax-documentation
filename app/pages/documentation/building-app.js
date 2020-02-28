import { Page } from '@webformula/pax-core';

export default class Buildingapp extends Page {
  get title() {
    return 'Building app';
  }

  template() {
    return /* html */`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="sub-article" id="create-our-fist-page">
          <h4>Build configuration file</h4>

          <p class="direction">file <b>/build.js</b></p>
          <monaco-editor language="javascript">
            import { build } from '@webformula/pax-core';

            build({
              // root app folder
              rootFolder: 'app',

              // pages folder path relative to root folder
              pagesFolder: 'pages',

              // layout file path relative to root folder
              layoutFilePath: 'layout.js',

              // destination for build files
              distFolder: 'dist',

              // optional
              // This will concatenate all the css files in the rootfolder into the distFolder
              css: {
                concat: true, // default false,
                filename: 'file.css' // defualt app.css
              },


              // configure routes
              //   routes can also be configures directly in the page classes
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

              // service worker config
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
              //   example: app/public/images/one.png = dist/images/one.png
              //
              // you can use wild cards
              //    copy all javascript files: app/public/**/*.js
              copyFiles: [
                {
                  from: 'app/public/**',
                  to: 'dist/'
                }
              ]
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

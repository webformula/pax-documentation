import { Page, html } from '@webformula/pax-core';

export default class ServiceWorker extends Page {
  get title() {
    return 'Service worker';
  }

  template() {
    return html`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h2>Service worker</h2>
          <p>PAX-core provides a easy to configure service worker that adds offline support and build management</p>
        </article>

        <h6 style="padding-left:24px;">Quick links</h6>
        <ul>
          <li><anchor-link selector="#auto-reload" offset="56px">Auto reload</anchor-link></li>
          <li><anchor-link selector="#manual-reload" offset="56px">Manual reload</anchor-link></li>
          <li><a href="https://github.com/webformula/pax-example-webpack-bundle" target="_new">Github: Example app</a></li>
        </ul>

        <article class="sub-article" id="auto-reload">
          <h4>Auto reload</h4>
          <p>The app will automatically reload all cached files when a new build is available</p>
          <monaco-editor language="javascript">
              import { build } from '@webformula/pax-core';

              build({
                rootFolder: 'app',
                pagesFolder: 'pages', // folder is assumed to be in rootFolder
                layoutFilePath: 'app/layout.js',
                distFolder: 'dist',
                routeConfig: {
                  root: 'HelloWorld' // page class name
                },

                // serice worker config
                serviceWorker: {
                  // include the service worker
                  include: true, // default false

                  // This will auto reload the webpage if there is a new build
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

        <article class="sub-article" id="manual-reload">
          <h4>Manual reload</h4>
          <p>The app will notify that a new build is available and only reload on demand</p>
          <monaco-editor language="javascript">
              import { build } from '@webformula/pax-core';

              build({
                rootFolder: 'app',
                pagesFolder: 'pages', // folder is assumed to be in rootFolder
                layoutFilePath: 'app/layout.js',
                distFolder: 'dist',
                routeConfig: {
                  root: 'HelloWorld' // page class name
                },

                // serice worker config
                serviceWorker: {
                  // include the service worker
                  include: true, // default false

                  // This will wait for manual reload
                  autoReload: false, // default true

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

          <monaco-editor language="javascript">
              window.onNewServiceWorkerAvailable(function () {
                // notify user
                //   It is common to see a banner or notification on the webpage witha reload button
                document.querySelector('#new-build-banner').display = 'block';
              });

              <button id="new-build-banner" style="display: none;" onclick="window.serviceWorkerSkipWaiting()"></button>
          </monaco-editor>
        </article>

        <section>
          <a class="button" href="#/documentation/web-components">Next: Web components</a>
        </section>
      </article>
    `;
  }
}

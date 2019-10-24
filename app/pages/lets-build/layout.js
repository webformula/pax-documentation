import { Page, html } from '@webformula/pax-core';

export default class Layout extends Page {
  get title() {
    return 'Layout';
  }

  template() {
    return html`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h2>Layout</h2>
          <p>
            This is the main template files. There is nothing fancy or special here, just a function that returns a template literal.
          </p>
        </article>

        <h6 style="padding-left:24px;">Quick links</h6>
        <ul>
          <li><anchor-link selector="#header-file" offset="56px">Header file</anchor-link></li>
          <li><anchor-link selector="#nav-file" offset="56px">Navigation file</anchor-link></li>
          <li><anchor-link selector="#index-file" offset="56px">Index file</anchor-link></li>
          <li><a href="#/lets-build/component">Next: 3. build a component</a></li>
        </ul>

        <article class="sub-article" id="header-file">
          <h4>Header file</h4>
          <p>This contains the top app bar</p>
          <div class="direction">create file: <b>layout/header.js</b></div>
          <monaco-editor language="javascript">
              import { html } from '@webformula/pax-core';

              export default function() {
                return html\`
                  <header>
                    <mdw-top-app-bar class="mdw-fixed mdw-white">
                      <section>
                        <mdw-icon onclick="document.querySelector('mdw-drawer.navigation').toggle()">menu</mdw-icon>
                        <span class="mdw-title">PAX documentation example</span>
                      </section>
                    </mdw-top-app-bar>
                  </header>
                \`;
              }
          </monaco-editor>
        </article>

        <article class="sub-article" id="nav-file">
          <h4>Navigation file</h4>
          <p>This contains the side nav bar</p>
          <div class="direction">create file: <b>layout/navigation.js</b></div>
          <monaco-editor language="javascript">
              import { html } from '@webformula/pax-core';

              export default function () {
                return html\`
                  <mdw-drawer class="navigation mdw-locked-open" style="width: 268px;">
                    <mdw-drawer-fixed>
                      <mdw-drawer-header>
                        <div class="mdw-title">PAX</div>
                        <div class="mdw-subtitle">Documentation example</div>
                      </mdw-drawer-header>

                      <mdw-drawer-content>
                        <mdw-list>
                          <mdw-list-item href="#/home" href-alt="#/">
                            <span class="mdw-list-item__graphic material-icons">inbox</span>
                            Home
                          </mdw-list-item>

                          <mdw-list-item href="#/ddd">
                            <span class="mdw-list-item__graphic material-icons">star</span>
                            Non existing
                          </mdw-list-item>
                        </mdw-list>
                      </mdw-drawer-content>
                    </mdw-drawer-fixed>
                  </mdw-drawer>
                \`;
              }
          </monaco-editor>
        </article>

        <article class="sub-article" id="index-file">
          <h4>Index file</h4>
          <p>This contains the side nav bar</p>
          <div class="direction">create file: <b>layout/index.js</b></div>
          <monaco-editor language="javascript" content="${`
              import { html } from '@webformula/pax-core';
              import header from './header.js';
              import nav from './navigation.js';

              export default function ({ head, body, title }) {
                return html\`
                  <!doctype html>
                  <html lang='en'>
                    <head>
                      <meta charset='UTF-8'>
                      <meta http-equiv='Cache-Control' content='no-store' />
                      <meta name='viewport' content='width=device-width, initial-scale=1'>
                      <meta name='Description' content='Build, render and serve web-components'>

                      <title>\${title}</title>

                      <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'>
                      <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' rel='stylesheet'>
                      <link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/webformula/pax-components@0.5.2-beta/dist/pax-components.css'>
                      <link rel='stylesheet' href='/styles/main.css'>

                      <script src='https://cdn.jsdelivr.net/gh/webformula/pax-components@0.5.2-beta/dist/pax-components.js'></script>

                      \${head}
                    </head>

                    <body>
                      \${nav({ title })}
                      <mdw-page>
                        \${header({ title })}
                        <mdw-content class='constrain-width'>
                          \${body}
                        </mdw-content>
                      </mdw-page>
                    </body>
                  </html>
                \`;
              }
          `}"></monaco-editor>
        </article>

        <a class="button" href="#/lets-build/component">Next: Lets build - 3. component</a>
      </article>
    `;
  }
}

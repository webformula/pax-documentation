import { Page,  html } from '/@webformula/pax-core/index.js'

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
          <h2>Main layout template</h2>
          <p>
            This is the main template file. There is nothing fancy or special here, just a function that rtuens a tempalte literal.
          </p>
        </article>

        <h6 style="padding-left:24px;">Quick links</h6>
        <ul>
          <li><anchor-link selector="#layout" offset="56px">Build layout</anchor-link></li>
          <li><a href="/lets-build/page">Next: 3. build a page</a></li>
        </ul>

        <article class="sub-article" id="layout">
          <h4>Main layout</h4>
          <p>This will wrap all the pages</p>
          <div class="direction">create file: <b>layout.js</b></div>
          <code-mirror mode="javascript">
              import { html } from '/@webformula/pax-core/index.js'

              export default function ({ head, body, title }) {
                return \`
                  <!-- <!doctype html> -->
                  <!-- <html lang="en"> -->
                    <!-- <head> -->
                      <meta http-equiv="Cache-Control" content="no-store" />
                      <title>\${title}</title>
                      <!-- this will get used for the interactive page -->
                      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

                      <!-- web-components-node js and css -->
                      <!-- These are handled by thee expressFileHandler in server.js -->
                      <link rel="stylesheet" href="http://localhost:3001/pax.css">
                      <script src="http://localhost:3001/pax.js"></script>
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

        <a class="button" href="/lets-build/page">Next: Lets build - 3. Page</a>
      </article>
    `;
  }
}

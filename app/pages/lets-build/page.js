import { Page, html } from '@webformula/pax-core';

export default class SimplePage extends Page {
  get title() {
    return 'Simple page';
  }

  template() {
    return html`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h2>Add a simple page</h2>
          <p>We will now add our first page. This will be a simple server-side renderd page with no functionality</p>
        </article>

        <h6 style="padding-left:24px;">Quick links</h6>
        <ul>
          <li><anchor-link selector="#page" offset="56px">Build simple page</anchor-link></li>
          <li><a class="button" href="#/lets-build/wrap-up">Next: Wrap up</a></li>
        </ul>

        <article class="sub-article" id="page">
          <h4>Build simple Home page</h4>
          <p>Its time to say "hello world"</p>
          <div class="direction">create file: <b>pages/home.js</b></div>
          <monaco-editor language="javascript">
              import { Page, html } from '@webformula/pax-core';

              export default class Home extends Page {
                get title() {
                  return 'Home';
                }

                onclick() {
                  alert('Hello click');
                }

                template() {
                  return html\`
                    <h2>Hello World</h2>
                    <!-- this is the component we built in the previous step -->
                    <simple-button onclick="activePage.onclick()">click me</simple-button>
                  \`;
                }
              };
          </monaco-editor>
        </article>


        <article class="sub-article" id="page">
          <h4>Build simple 404 page</h4>
          <p>This will show on any invalid url</p>
          <div class="direction">create file: <b>pages/fourOFour.js</b></div>
          <monaco-editor language="javascript">
              import { Page, html } from '@webformula/pax-core';

              export default class FourOFour extends Page {
                get title() {
                  return '404';
                }

                template() {
                  return html\`
                    <h2>Page not found</h2>
                  \`;
                }
              };
          </monaco-editor>
        </article>

        <a class="button" href="#/lets-build/wrap-up">Next: Wrap up</a>
      </article>
    `;
  }
}

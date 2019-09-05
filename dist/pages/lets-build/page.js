import { Page,  html } from '/@webformula/pax-core/index.js'

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
          <p>
            We will now add our first page. This will be a simple server-side renderd page with no functionality
          </p>
        </article>

        <h6 style="padding-left:24px;">Quick links</h6>
        <ul>
          <li><anchor-link selector="#page" offset="56px">Build simple page</anchor-link></li>
          <li><a href="/lets-build/interactive-page">Next: 4. build an interactive page</a></li>
        </ul>

        <article class="sub-article" id="page">
          <h4>Build simple page</h4>
          <p>Its time to say "hello world"</p>
          <div class="direction">create file: <b>hello-world.js</b></div>
          <code-mirror mode="javascript">
              import { Page,  html,  css } from '/@webformula/pax-core/index.js'

              export default class HelloWorld extends Page {
                // page title. This returns from the page.build() method
                get title() {
                  return 'Hello World';
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
                  return css\`
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

        <a class="button" href="/lets-build/interactive-page">Next: Lets build - 4. Interactive page</a>
      </article>
    `;
  }
}

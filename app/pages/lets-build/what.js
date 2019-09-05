import { Page, html } from '@webformula/pax-core';

export default class What extends Page {
  get title() {
    return 'What we will build';
  }

  template() {
    return html`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h2>Lets build!</h2>
          <p>This tutorial will walk you through building a simple site with 2 pages and a component.</p>

          <h6 style="padding-left:24px;">links</h6>
          <ul>
            <li><a href="https://github.com/webformula/pax-documentation-example">Github repo<a></li>
            <li><a href="#/lets-build/layout">Next: Lets build - 2. Layout</a></li>
          </ul>
        </article>


        <article class="sub-article" id="structure">
          <h4>Project structure</h4>
          <code-mirror mode="html">
              app/
                layout/
                  index.js
                  header.js
                  navigation.js
                pages/
                  hello-world.js
              build.js
              package.json
          </code-mirror>
        </article>

        <a class="button" href="#/lets-build/layout">Next: Lets build - 2. Layout</a>
      </article>
    `;
  }
}

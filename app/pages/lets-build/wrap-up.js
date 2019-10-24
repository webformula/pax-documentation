import { Page, html } from '@webformula/pax-core';

export default class WrapUp extends Page {
  get title() {
    return 'Wrap up';
  }

  template() {
    return html`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h3>You have completed the tutorial!</h3>
          <p>Now run it</p>

          <monaco-editor language="javascript">
              npm install
              npm start

              # navigate to http://localhost:8080
          </monaco-editor>
        </article>
      </article>
    `;
  }
}

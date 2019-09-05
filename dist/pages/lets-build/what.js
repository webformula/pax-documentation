import { Page,  html } from '/@webformula/pax-core/index.js'

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
          <h2>You shall start!</h2>
          <p></p>
        </article>
      </article>
    `;
  }
}

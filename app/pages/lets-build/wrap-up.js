const {
  Page,
  html
} = require('@webformula/pax-core');

module.exports = class WrapUp extends Page {
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
          <h2>You have completed the tutorial!</h2>
          <p></p>
        </article>
      </article>
    `;
  }
};

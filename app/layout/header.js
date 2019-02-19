const { html } = require('@webformula/pax-core');
const { dependencies } = require('../../package.json');

module.exports = ({ title }) => html`
  <div style="height: 56px;">
    <header>
      <h2>PAX</h2>
      <span class="version"><a href="https://github.com/webformula/pax-core/releases/tag/v${dependencies['@webformula/pax-core'].replace('^' , '')}" target="_blank">${dependencies['@webformula/pax-core'].replace('^' , '')}</a></span>
      <span class="subtext">Welcome to the wounderful world of the web</span>
    </header>
  </div>
`;

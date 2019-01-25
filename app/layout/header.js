const { html } = require('@webformula/pax-core');
const { dependencies } = require('../../package.json');

module.exports = ({ title }) => html`
  <div style="height: 56px;">
    <header>
      <h2>web-componenets-node</h2>
      <span class="version">${dependencies['@webformula/pax-core'].replace('^' , '')}</span>
      <span class="subtext">Welcome to the wounderful world of the web</span>
    </header>
  </div>
`;

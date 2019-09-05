import { Page,  html } from '/@webformula/pax-core/index.js'

export default class FourOFour extends Page {
  get title() {
    return 'Introduction';
  }

  template() {
    return html`
      <h2>Page Not Found</h2>
      <p>Sorry, but the page you were trying to view does not exist.</p>
    `;
  }
}

import { Page, html } from '@webformula/pax-core';

export default class Examples extends Page {
  get title() {
    return 'Examples';
  }

  open(url) {
    window.open(url, '_new');
  }

  template() {
    return html`
      <article class="page-article">
        <h1 class="article-title">Examples</h1>
        <p>A list of examples to show you how to build a fully functional app</p>

        <h6 style="margin-top: 56px;">Example links</h6>
        <mdw-list class="mdw-two-line">
          <mdw-list-item onclick="activePage.open('https://github.com/webformula/pax-example-common')">
            <mdw-icon mdw-src="GitHub-Mark-32px.png"></mdw-icon>
            <div class="mdw-list-item__text">
              <div class="mdw-list-item__primary-text">
                Common App
              </div>
              <div class="mdw-list-item__secondary-text">
                Common app with a login page, JWT token auth using a refresh strategy, and webpack bundling
              </div>
            </div>
            <div class="mdw-ripple mdw-list-item-ripple"></div>
            <mdw-icon class="mdw-list-item__meta">launch</mdw-icon>
          </mdw-list-item>
        </mdw-list>
      </article>
    `;
  }
}

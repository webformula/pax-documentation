import { Page } from '@webformula/pax-core';

export default class Examples extends Page {
  get title() {
    return 'Examples';
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h1 class="article-title">Examples</h1>
        <p>A list of examples to show you how to build a fully functional app</p>

        <h6 style="margin-top: 56px;">Example links</h6>
        <mdw-list class="mdw-two-line">
          <mdw-list-item disabled>
            <div class="mdw-list-item__text">
              <div class="mdw-list-item__primary-text">
                Common App
              </div>
              <div class="mdw-list-item__secondary-text">
                Login page, JWT token auth using a refresh strategy, and webpack bundling
              </div>
            </div>

            <mdw-button href="https://github.com/webformula/pax-example-common" target="_blank" class="mdw-list-item__meta">
              <mdw-icon mdw-src="GitHub-Mark-32px.png" style="padding-right: 4px;"></mdw-icon>
              GitHub
            </mdw-button>

            <mdw-button href="http://examples.common.webformula.io" target="_blank" class="mdw-list-item__meta">
              <mdw-icon class="mdw-list-item__meta">launch</mdw-icon>
              example
            </mdw-button>
          </mdw-list-item>
        </mdw-list>
      </article>
    `;
  }
}

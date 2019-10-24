import { Page, html } from '@webformula/pax-core';

export default class Component extends Page {
  get title() {
    return 'Component';
  }

  connectedCallback() {
    const percentProgressBar = document.querySelector('#percent-progress-bar');
    let percent = 0;
    const interval = setInterval(() => {
      percent += 0.1;
      percentProgressBar.setAttribute('percent', percent);
      if (percent === 100) clearInterval(interval);
    }, 1);
  }

  template() {
    return html`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h2>Add a component</h2>
          <p>

          </p>
        </article>

        <h6 style="padding-left:24px;">Quick links</h6>
        <ul>
          <li><anchor-link selector="#one" offset="56px">Build a simple component</anchor-link></li>
          <li><anchor-link selector="#two" offset="56px">Add progress bar to page</anchor-link></li>
          <li><a href="#/lets-build/page">Next: 4. build a page</a></li>
        </ul>

        <article class="sub-article" id="one">
          <h4>Build a component</h4>
          <p>We will be building a simple button component</p>
          <div class="direction">create file: <b>components/simple-button.js</b></div>
          <monaco-editor language="javascript">
              /*
               * HTML
               * <basic-link link="1234">label</basic-link>
               */
               import { HTMLElementExtended, html } from '@webformula/pax-core';

               customElements.define('simple-button', class extends HTMLElementExtended {
                 constructor() {
                   super();

                   this.cloneTemplate();
                 }

                 template() {
                   return html\`
                     <button>
                       <slot></slot>
                     </button>
                   \`;
                 }
               });
          </monaco-editor>
        </article>

        <a href="#/lets-build/page">Next: 4. build a page</a>
      </article>
    `;
  }
}

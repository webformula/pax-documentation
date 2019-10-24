import { Page, html } from '@webformula/pax-core';

export default class WebComponents extends Page {
  get title() {
    return 'Web components';
  }

  template() {
    return html`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h2>Web components</h2>
          <p>
            Below you can see how to build and package web components with your pages.
          </p>
        </article>

        <h6 style="padding-left:24px;">Quick links</h6>
        <ul>
          <li><anchor-link selector="#standard-web-components" offset="56px">Standard web component</anchor-link></li>
          <li><anchor-link selector="#web-component-with-render" offset="56px">Web component with render</anchor-link></li>
        </ul>

        <article class="sub-article" id="standard-web-components">
          <h4>Standard web component</h4>
          <monaco-editor language="javascript">
              /*
               * HTML
               * <basic-link link="1234">label</basic-link>
               */
              import { HTMLElementExtended } from '@webformula/pax-core';

              customElements.define('basic-link', class extends HTMLElementExtended {
                constructor() {
                  super();

                  // this is provided by HTMLElementExtended
                  // This will use the prerendered template based on your template() and styles() methods
                  this.cloneTemplate();
                }

                template() {
                  return \`
                    <a href="\${this.link}">
                      <slot></slot>
                    </a>
                  \`;
                }

                get link() {
                  return this.getAttribute('link');
                }
              });
          </monaco-editor>
        </article>

        <article class="sub-article" id="web-component-with-render">
          <h4>Web component with render</h4>
          <p>The HTMLElementExtended class provides a render method that you can use to re-render the components html/p>
          <monaco-editor language="javascript">
              /*
               * HTML
               * <simple-select list="1,2,3"></simple-select>
               */
              import { HTMLElementExtended } from '@webformula/pax-core';

              customElements.define('simple-select', class extends HTMLElementExtended {
                constructor() {
                  super();

                  // default data state
                  this.selected = null;
                  this.list = this.getAttribute('list') || '';
                }

                connectedCallback() {
                  this.render(); // This is provided by HTMLElementExtended
                  this.shadowRoot.querySelector('select').addEventListener('change', event => {
                    this.selected = event.target.value;
                  });
                }

                static get observedAttributes() {
                  return ['list'];
                }

                attributeChangedCallback(name, oldValue, newValue) {
                  this[name] = newValue;
                }

                set list(value) {
                  this._list = value.split(',');
                  this.selected = null;
                  this.render(); // re-render new list. This is provided by HTMLElementExtended
                }

                template() {
                  return \`
                    <select>
                      \${this._list.map(function (i) return \`
                        <option value="\${i}" \${this.selected === i ? 'selected' : ''}>\${i}</option>
                      \`;}).join('\\n')}
                    </select>
                  \`;
                }
              });
          </monaco-editor>
        </article>

        <section>
          <a class="button" href="#/lets-build/what">Next: Lets build</a>
        </section>
      </article>
    `;
  }
}

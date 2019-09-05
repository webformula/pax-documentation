import { Page,  html } from '/@webformula/pax-core/index.js'

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
          <li><anchor-link selector="#one" offset="56px">Build a component</anchor-link></li>
          <li><anchor-link selector="#two" offset="56px">Add progress bar to page</anchor-link></li>
          <li><a href="/examples/loading-client">Next: Examples</a></li>
        </ul>

        <article class="sub-article" id="one">
          <h4>Build a component</h4>
          <p>We will be building the progress barr you see below</p>
          <progress-bar></progress-bar>
          <progress-bar id="percent-progress-bar" percent="0"></progress-bar>
          <div class="direction">
            create file: <b>progress-bar.js</b><br />
            Require <b>progress-bar.js</b> in the <b>server.js</b> file.
          </div>
          <code-mirror mode="javascript">
              /*
               * HTML
               * <basic-link link="1234">label</basic-link>
               */
              import { HTMLElementExtended,  css,  html } from '/@webformula/pax-core/index.js'

              customElements.define('progress-bar', class extends HTMLElementExtended {
                constructor() {
                  super();

                  // this is provided by HTMLElementExtended
                  // This will use the prerendered template based on your html() and css() methods
                  this.cloneTemplate();
                }

                connectedCallback() {
                  if (this.percent === null) this.classList.add('query')
                }

                static get observedAttributes() {
                  return ['percent'];
                }

                attributeChangedCallback(name, _oldValue, newValue) {
                  this[name] = newValue;
                }

                get bar() {
                  if (!this._bar) this._bar = this.shadowRoot.querySelector('.bar');
                  return this._bar;
                }

                get percent() {
                  return this.getAttribute('percent');
                }

                set percent(value) {
                  if (value < 0) value = 0;
                  if (value > 100) value = 100;
                  this.bar.style.width = \`\${value}%\`;
                }

                styles() {
                  return css\`
                    :host {
                      display: block;
                      position: relative;
                      width: 100%;
                      height: 6px;
                      padding-top: 0;
                      margin-bottom: 0;
                      background-color: #d4e5ff;
                    }
                    .bar {
                      position: absolute;
                      left: 0;
                      top: 0;
                      bottom: 0;
                      width: 100%;
                      height: 6px;
                      background-color: #7499cb;
                    }
                    :host(.query) .bar {
                      transition: all 0.2s linear;
                      animation: query .8s infinite cubic-bezier(0.390, 0.575, 0.565, 1.000);
                    }
                    @keyframes query {
                      0% {
                        opacity: 1;
                        transform: translateX(35%) scale(.3, 1);
                      }
                      100% {
                        opacity: 0;
                        transform: translateX(-50%) scale(0, 1);
                      }
                    }
                  \`;
                }

                template() {
                  return html\`
                    <div class="bar"></div>
                  \`;
                }
              });
          </code-mirror>
        </article>

        <article class="sub-article" id="two">
          <h4>Add progress bar to page</h4>
          <p>Lets add the progress bar to the hello world page</p>
          <div class="direction">update file: <b>hello-world.js</b></div>
          <code-mirror mode="javascript">
              // basic page that uses server side rendering
              import { Page,  html } from '/@webformula/pax-core/index.js'

              export default class HelloWorld extends Page {
                get title() {
                  return 'Basic page';
                }

                connectedCallback() {
                  /* pages are slotted so you need to go through the slot to get to the elements.
                   * To make the easier you can access the render block directly. This is provided by web-componenets-node
                   * Example without renderBlock: this.shadowRoot.querySelector("slot").assignedNodes().find(n => n.nodeName === "RENDER-BLOCK")
                   */
                  const percentProgressBar = document.querySelector('#percent-progress-bar');
                  let percent = 0;
                  const interval = setInterval(() => {
                    percent += 0.1;
                    percentProgressBar.setAttribute('percent', percent);
                    if (percent === 100) clearInterval(interval);
                  }, 1);
                }

                template() {
                  return html\`
                    <h2>Hello world</h2>

                    <!-- default progress bar uses query animation -->
                    <progress-bar></progress-bar>
                    <!-- you can also use percent(0-100) -->
                    <progress-bar id="percent-progress-bar" percent="0"></progress-bar>
                  \`;
                }
              };
          </code-mirror>
        </article>

        <a class="button" href="/examples/loading-client">Next: Examples</a>
      </article>
    `;
  }
}

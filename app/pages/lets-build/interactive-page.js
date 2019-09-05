import { Page, html } from '@webformula/pax-core';

export default class InteractivePage extends Page {
  get title() {
    return 'Interactive page';
  }

  template() {
    return html`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h2>Add a interactive page</h2>
          <p>
            This page will contain functionality. We will send it down tot the cleint pr-rendered and then the client will re-render when the user interacts with the page.
          </p>
        </article>

        <h6 style="padding-left:24px;">Quick links</h6>
        <ul>
          <li><anchor-link selector="#service" offset="56px">Add service</anchor-link></li>
          <li><anchor-link selector="#route" offset="56px">Add states route</anchor-link></li>
          <li><anchor-link selector="#page" offset="56px">Build interactive page</anchor-link></li>
          <li><a href="/lets-build/component">Next: 5. build a component</a></li>
        </ul>

        <article class="sub-article" id="service">
          <h4>Add service</h4>
          <p>We will add a simple service to provide a small list of states and cities</p>
          <div class="direction">create file: <b>service.js</b></div>
          <code-mirror mode="javascript">
            <code>
                const states = () => ([
                  { label: 'Texas', cities: [
                    { label: 'Austin' },
                    { label: 'Dallas' },
                    { label: 'Houston' }
                  ] },
                  { label: 'Pensylvania', cities: [
                    { label: 'Allentown' },
                    { label: 'Philadelphia' },
                    { label: 'Pittburg' }
                  ] }
                ]);

                export { states };
            </code>
          </code-mirror>
        </article>

        <article class="sub-article" id="route">
          <h4>Add states endpoint</h4>
          <p>We will add a simple endpoint to the server.js file and provide a small hard coded list of states with cities.</p>
          <div class="direction">
            open file: <b>server.js<b><br />
            Insert new endpoint before page router on line <a href="https://gist.github.com/B-3PO/f0c8ab86789e591e0d5a147a055940c6#file-web-components-node-create-server-js-L19">19</a>
          </div>
          <code-mirror mode="javascript">
            <code>
                import { states } from 'service';

                router.get('/api/states', (_req, res) => {
                  res.send({ states: states() });
                });
            </code>
          </code-mirror>
        </article>

        <article class="sub-article" id="page">
          <h4>Build interactive page</h4>
          <p>Lets get interactive!</p>
          <div class="direction">create file: <b>state-city-page.js</b></div>
          <code-mirror mode="javascript">
              import { Page, html } from '@webformula/pax-core';
              import { states } from '../service';

              export default class InteractivePage extends Page {
                constructor() {
                  super();
                  this.list = [];
                  this.states = [];
                  this.cities = [];
                  this.selectedState = null;
                  this.selectedCity = null;
                }

                // page title
                get title() {
                  return 'Interactive';
                }

                async connectedCallback() {
                  // axios is imported by the client
                  const { data } = await axios.get('/api/states');
                  this.states = data.states;
                  this.render(); // re-render the page. This method is made available by \`customElements.exportWithRender\`
                }

                stateSelectChange(value) {
                  this.selectedState = value;
                  const state = this.states.find(i => i.name === value);
                  if (state) this.cities = state.cities;
                  else this.cities = [];
                  this.selectedCity = null;
                  this.render(); // re-render the page. This method is made available by \`customElements.exportWithRender\`
                }

                citySelectChange(value) {
                  this.selectedCity = value;
                }

                template() {
                  return html\`
                    <h2>Interactive</h2>
                    <div>
                      <select onchange="$homePage.stateSelectChange(this.value)" mdw-value="/${this.selectedState}">
                        <option value="" disabled>State...</option>
                        \${this.states.map(s => html\`
                          <option value="\${s.name}">\${s.name}</option>
                        \`).join('\n')}
                      </select>
                      <select onchange="$homePage.citySelectChange(this.value)" mdw-value="/${this.selectedCity}">
                        <option value="" disabled>City...</option>
                        \${this.cities.map(c => html\`
                          <option value="\${c.name}">\${c.name}</option>
                        \`).join('\n')}
                      </select>
                    </div>
                  \`;
                }
              }
          </code-mirror>
        </article>

        <a class="button" href="/lets-build/component">Next: Lets build - 5. Component</a>
      </article>
    `;
  }
}

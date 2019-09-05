import { Page, html } from '@webformula/pax-core';

export default class BuildingPages extends Page {
  get title() {
    return 'Building pages';
  }

  template() {
    return html`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h2>Building pages</h2>
          <p>
          Below are a list of examples showing you how to build pages witha range of features, including server-side rendering and dynamic html
          </p>
        </article>

        <h6 style="padding-left:24px;">Quick links</h6>
        <ul>
          <li><anchor-link selector="#basic-page" offset="56px">Basic page</anchor-link></li>
          <li><anchor-link selector="#interactive-page" offset="56px">Interactive page</anchor-link></li>
          <li><a href="/documentation/page-mapper">Next: Page Mapper</a></li>
        </ul>

        <article class="sub-article" id="basic-page">
          <h4>Basic page</h4>
          <p>Basic page that uses server-side rendering</p>
          <code-mirror mode="javascript">
              // basic page that uses server side rendering
              import { Page, html } from '@webformula/pax-core';

              export default class BasicPage extends Page {
                constructor() {
                  super();
                  this.label = 'Basic Page';
                }

                get title() {
                  return 'Basic page';
                }

                template() {
                  return html\`
                    <div id="content">
                      <h2>\${this.label}</h2>
                    </div>
                  \`;
                }
              };
          </code-mirror>
        </article>

        <article class="sub-article" id="interactive-page">
          <h4>Interactive page</h4>
          <p>Rerender the page when data is updated</p>
          <code-mirror mode="javascript">
              import { Page, html } from '@webformula/pax-core';
              import { getStates } from '../services/states';

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

        <a class="button" href="/documentation/page-mapper">Next: Page Mapper</a>
      </article>
    `;
  }
}

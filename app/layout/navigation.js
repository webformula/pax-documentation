import { html } from '@webformula/pax-core';

export default function () {
  return html`
    <mdw-drawer class="navigation mdw-locked-open" style="width: 268px;">
      <mdw-drawer-header>
        <span class="main-title">PAX</span>
        <span class="main-title">WEB</span>
        <span class="main-title">TOOLS</span>
      </mdw-drawer-header>

      <mdw-drawer-content>
        <nav>
          <span class="title">Welcome</span>
          <a href="#/">Introduction</a>

          <expander-container>
            <expander-header>
              <span class="expander-label">Links</span>
              <expander-arrow></expander-arrow>
            </expander-header>

            <expander-content class="indent">
              <a href="https://github.com/webformula/pax-core" target="new">GitHub</a>
              <a href="https://www.npmjs.com/org/pacts" target="new">npm</a>
              <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" target="new">MDN Web components</a>
              <a href="https://www.w3.org/standards/techs/components#w3c_all" target="new">Web components spec</a>
            </expander-content>
          </expander-container>

          <section>
            <span class="title">Documentation</span>
            <a href="#/documentation/getting-started">Getting started</a>
            <a href="#/documentation/pages">Building Pages</a>
            <a href="#/documentation/web-components">Web componenets</a>
          </section>

          <section>
            <span class="title">Lets build</span>
            <a href="#/lets-build/what"><b>1</b>&nbsp What we will build</a>
            <a href="#/lets-build/layout"><b>2</b>&nbsp Layout</a>
            <a href="#/lets-build/page"><b>3</b>&nbsp Simple page</a>
            <a href="#/lets-build/interactive-page"><b>4</b>&nbsp Interactive page</a>
            <a href="#/lets-build/component"><b>5</b>&nbsp Component</a>
            <a href="#/lets-build/wrap-up">Wrap up</a>
          </section>

          <section>
            <span class="title">Examples</span>
          </section>
        </nav>
      </mdw-drawer-content>
    </mdw-drawer>
  `;
}

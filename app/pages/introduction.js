import { Page } from '@webformula/pax-core';

export default class Introduction extends Page {
  get title() {
    return 'Introduction';
  }

  template() {
    return /* html */`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <article>
        <article class="into-article">
          <h3>Introduction</h3>
          <p>This project promotes the usage of web components. If you are not familiar with the web-component specs then I would suggest reading them first. <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" target="_blank" style="display: inline;">Link</a></p>

          <h5>What</h5>
          <p><b>PAX</b> is a set of tools to allow web pages to be built simply, natively and without stacks of dependencies. PAX add some great features including dynamic client side rendering, page routing and management, performance (using native browser features), snowpack, parceljs, webpack and rollup compatibility, pwa compatibility, and more.</p>

          <h5>Why</h5>
          <p>Browsers, javascript, css, and html are evolving in a uniform and predictable pace. Many features that are provided by frameworks(react, angular, vue, ...) are now available in native forms in the browser. It is time to start building web sites and applications the way we used to, natively and with out loads of dependencies. With web-components spec becoming V1 we now have one of the last major features that frameworks provide in a native form (custom html with code associated to it). In short lets learn/return to javascript, css, and html at its core</p>

          <h5>Highlights</h5>
          <ul>
            <li>Zero dependencies</li>
            <li>Tiny footprint 16kb (4kb gziped)</li>
            <li>No development tools needed</li>
            <li>Follows modern best practices</li>
            <li>Compatible with all packagin tools. Snowpack, Webformula, Parceljs, Rollup</li>
            <li>Performance (uses native browser features)</li>
            <li>Small learning curve. The majority of what you need to learn is vanilla javascript and DOM</li>
          </ul>


          <h5 style="padding-top: 24px;">Goals</h5>
          <img src="images/goals-performance.png" alt="" width=100% style="padding-top:24px; padding-bottom: 32px;" />
          <div class="row">
            <div class="flex column-article">
              <h6>Perform</h6>
              <p>
                Decrease load times. Increase developer productivity. Interact with native browsers features
              </p>
            </div>

            <div class="flex column-article">
              <h6>Simplify</h6>
              <p>
                Simplify code and use js, css at its core
              </p>
            </div>

            <div class="flex column-article">
              <h6>Reduce</h6>
              <p>
                Reduce the number of dependencies needed to create a web application
              </p>
            </div>
          </div>
        </article>

      </article>
    `;
  }
};

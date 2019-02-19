const {
  Page,
  html
} = require('@webformula/pax-core');

module.exports = class Introduction extends Page {
  connectedCallback() {
    const percentProgressBar = document.querySelector('mdw-linear-progress[percent]');
    let percent = 0;
    const interval = setInterval(() => {
      percent += 0.1;
      percentProgressBar.setAttribute('percent', percent);
      if (percent === 100) clearInterval(interval);
    }, 1);
  }

  get title() {
    return 'Introduction';
  }

  test(e) {
    console.log('okokokoko');
    console.log(e)
  }

  mockWait() {
    return new Promise(resolve => {
      setTimeout(resolve, 5000);
    });
  }

  template() {
    return html`
      <div class="disclaimer-container">
        Disclaimer: This is a beta version
      </div>

      <div>
        <mdw-circular-progress mode="indeterminate" diameter="50"></mdw-circular-progress>
      </div>

      <div>
        <mdw-linear-progress></mdw-linear-progress>
        <mdw-linear-progress percent="0"></mdw-linear-progress>
      </div>

      <div>
        <mdw-button>basic</mdw-button>
        <mdw-button raised>raised</mdw-button>
        <mdw-button unelevated class="primary">unelevated primary</mdw-button>
        <mdw-button outlined class="secondary">outlined secondary</mdw-button>
        <mdw-button raised shaped class="primary">shaped primary</mdw-button>
        <mdw-button dense raised>dense raised</mdw-button>
        <mdw-button dense outlined shaped class="error">dense outlined shaped error</mdw-button>
        <mdw-button raised class="primary" async="$Introduction.mockWait()" onclick="console.log('should not log')">Async</mdw-button>
      </div>

      <div>
        <mdw-checkbox onchange="$Introduction.test(this.checked)"></mdw-checkbox>
        <mdw-checkbox indeterminate class="primary"></mdw-checkbox>
        <mdw-checkbox class="error"></mdw-checkbox>
      </div>

      <div>
        <mdw-icon>home</mdw-icon>
        <mdw-icon class="primary">person</mdw-icon>
        <mdw-icon class="error">delete</mdw-icon>
      </div>

      <form name="theform">
        <div class="row space-between wrap" style="justify-content: space-around; flex-wrap: wrap;">
          <mdw-text-field-container>
            <mdw-text-field>
              <input name="my-text-field" required>
              <label for="my-text-field">Hint text</label>
            </mdw-text-field>
            <mdw-helper-text>helper text</mdw-helper-text>
            <mdw-helper-text validation>Error text</mdw-helper-text>
          </mdw-text-field-container>

          <mdw-text-field-container>
            <mdw-text-field outlined>
              <input name="my-text-field" required>
              <label for="my-text-field">Hint text</label>
            </mdw-text-field>
            <mdw-helper-text validation>Error text</mdw-helper-text>
          </mdw-text-field-container>
        </div>
      </form>

      <article>
        <article class="into-article">
          <h3>Introduction</h3>
          <p>This project promotes the usage of web components. If you are not familiar with the web-component specs then I would suggest reading them first. <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">Link</a></p>

          <h5>What</h5>
          <p><b>P.A.C.T.S. (pages and components tool set)</b> is a set of tools to allow web pages to be built simply, nativly and without stacks of dependencies. The tools add some great features including server-side rendering, dynamic client side rendering, performance (using native browser features), optimizations that reduces load times, managed client side caching, pwa compatability, and more.</p>

          <h5>Why</h5>
          <p>Browsers, javascript, css, and html are evolving in a uniform and predictable pace. Many features that are provided by frameworks(react, angular, vue, jquery) are now available in native forms in the browser. It is time to start looking at building web sites and applications the way we used to, nativly and with out loads of dependencies. With web-components spec becoming V1 we now have one of the last major features that frameworks provide in a native form (custom html with code associated to it). In short lets learn / return to javascript, css, and html at its core</p>

          <h5>Goals</h5>
          <img src="assets/images/goals-performance.png" alt="" width=100% style="padding-top:24px; padding-bottom: 32px;" />
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
                Simplify code and use js, html, css at its core
              </p>
            </div>

            <div class="flex column-article">
              <h6>Reduce Reduce Reduce</h6>
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

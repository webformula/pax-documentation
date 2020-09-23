import { Page } from '@webformula/pax-core';

export default class BasicExample extends Page {
  get title() {
    return 'Basic example';
  }

  connectedCallback() {
    document.querySelector('#indexhtml-editor').content = `
      <!doctype html>
      <html lang='en'>
        <head>
          <meta http-equiv="Cache-Control" content="no-store" />
          <title></title>
          <script src="pax-entry.js" type="module"></script>
          <!-- this is optional. You can decide to package your templates separately or not at all -->
          <script src="pax-templates.js"></script>
        </head>
        <body>
          <!-- this is needed for the router -->
          <page-container></page-container>
        </body>
      </html>
    `;

    document.querySelector('#entryjs-editor').content = `
      // paths need to be relative for them to work in the browser
      import { router } from '@webformula/pax-core';

      // --- components ---
      // you can also import these on the pages that use them
      import './components/custom-button.js';

      // --- pages ---
      import Home from './pages/home/page.js';
      import another from './pages/another.js';

      // configure router
      router.addPageClass(Home, '/');
      // second handles its routes internally
      router.addPageClass(another);
      router.init();
    `;

    document.querySelector('#editor-1').content = `
      // Page.js
      import { Page } from '@webformula/pax-core';

      export default class Home extends Page {
        get title() {
          return 'Home';
        }

        onClick() {
          alert('clicked');
        }

        template() {
          // return 'hello';
          return 'pages/home/page.html';
        }

        // optional css
        styles() {
          return \`
            body {
              margin: 0;
            }
          \`;
        }
      };
    `;

    document.querySelector('#editor-2').content = `
      <!-- page.html -->
      <!-- you can use es6 template literal syntax in templated html. This means no need for adding mustache or other templating modules -->
      
      <div>Hello world</div>
      <!-- activePage represents the current page class -->
      <!-- pax-core allows you to use es6 template strings in template files -->
      <custom-button onclick="\${activePage.onClick()}">custom button</custom-button>

      <a href="/#another">Another page</a>
    `;

    document.querySelector('#editor-page2').content = `
      import { Page } from '@webformula/pax-core';

      export default class Second extends Page {
        get title() {
          return 'Another';
        }

        static get routes() {
          return [
            'another',
            'other'
          ];
        }

        template() {
          return /*html*/\`
            < div > Second</div >
              <a href="/">Home page</a>

          \`;
        }
      };
    `;

    document.querySelector('#editor-custom-button').content = `
      import { HTMLElementExtended } from '@webformula/pax-core';

      customElements.define('custom-button', class extends HTMLElementExtended {
        constructor() {
          super();

          this.bound_onClick = this.onclick.bind(this);
          this.cloneTemplate();
        }

        get buttonElement() {
          return this.querySelector('button');
        }

        connectedCallback() {
          this.buttonElement.addEventListener('click', this.bound_onClick);
        }

        disconnectedCallback() {
          this.buttonElement.removeEventListener('click', this.bound_onClick);
        }

        onclick() {
          console.log('component clicked');
        }

        template() {
          return /*html*/\`
            < button >
            <slot></slot>
            </button >
          \`;
        }
      });
    `;

    document.querySelector('#editor-dev').content = `
      {
        "scripts": {
          "mount:src": "mount app --to /",
          "mount:webmodules": "mount $WEB_MODULES --to /web_modules"
        },
        "install": [
          "@webformula/pax-core"
        ],
        "installOptions": {
          "treeshake": false
        },
        "buildOptions": {
          "baseUrl": "./"
        }
      }
    `;
  }

  template() {
    return 'pages/documentation/basic-example/page.html';
  }
}

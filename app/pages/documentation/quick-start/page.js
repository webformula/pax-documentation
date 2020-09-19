import { Page } from '@webformula/pax-core';

export default class GettingStarted extends Page {
  get title() {
    return 'Getting started';
  }

  testClick() {
    console.log('sdflkjsdlfjsdflkjsdfjl');
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

    document.querySelector('#editor-1').content = `
      // Page.js
      import { Page } from '@webformula/pax-core';

      export default class HelloWorld extends Page {
        constructor() {
          super();

          // interact with route parameters ('route/:parameter')
          this.routerParameters = router.getUrlParameters();
          this.routeParamterIs = router.getUrlParameter('id');
        }

        // page title. This returns from the page.build() method
        get title() {
          return 'Hello World';
        }

        // add page routes
        // The page will have a default route of its folder location. ('HelloWorld')
        static get routes() {
          return [
            // route with parameter
            'home/:id',
            'two'
          ]
        }

        /* onclick() method is made available on the element
          * you can access the pages methods by using 'activePage' in the html
          */
        onclick() {
          alert('clicked');
        }

        // optional css
        styles() {
          return \`
            body {
              margin: 0;
            }
          \`;
        }

        template() {
          // Path must be from src folder. Currently you cannot use relative paths (./page.html)
          return 'pages/helloWorld/page.html';
        }
      }
    `;

    document.querySelector('#editor-2').content = `
      <!-- page.html -->
      <!-- you can use es6 template literal syntax in templated html. This means no need for adding mustache or other templating modules -->
      
      <!-- "activePage" represents the page class -->
      <h2>\${activePage.title}</h2>
      <button onclick="activePage.onclick()">click me</button>
    `;
  }

  template() {
    // path must be from src folder. you cannot currently use relative paths (./page.html)
    return 'pages/documentation/quick-start/page.html';
  }
}

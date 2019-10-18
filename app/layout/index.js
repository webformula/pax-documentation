import { html } from '@webformula/pax-core';
import header from './header.js';
import nav from './navigation.js';

export default function ({ head, body, title }) {
  return html`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Cache-Control" content="no-store" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="Description" content="Build, render and serve web-components">
        <meta name="theme-color" content="#364051"/>

        <title>${title}</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Mono" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">

        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png">
        <link rel="mask-icon" href="assets/images/safari-pinned-tab.svg" color="#5bbad5">
        <link rel="manifest" href="manifest.json">

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@0.5.2-beta/dist/pax-components.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/codemirror.css">
        <link rel="stylesheet" href="/styles/one-dark.css">
        <link rel="stylesheet" href="/styles/main.css">
        <link rel="stylesheet" href="/styles/page.css">

        <script type="module" src="https://cdn.jsdelivr.net/gh/webformula/pax-components@0.5.2-beta/dist/pax-components.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/codemirror.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/addon/runmode/runmode-standalone.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/mode/javascript/javascript.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/mode/xml/xml.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/mode/css/css.js"></script>
        <!-- <script src="load-service-worker.js"></script> -->

        ${head}
      </head>

      <body>
        ${nav({ title })}
        <mdw-page>
          ${header({ title })}
          <mdw-content class="constrain-width">
          ${body}
          </mdw-content>
        </mdw-page>
      </body>
    </html>
  `;
}

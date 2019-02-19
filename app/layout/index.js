const {
  html
} = require('@webformula/pax-core');
const header = require('./header');
const nav = require('./navigation');
require('../components');

module.exports = ({ head, body, title }) => html`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Cache-Control" content="no-store" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="Description" content="Build, render and serve web-components">
      <meta name="theme-color" content="#364051"/>

      <title>${title}</title>

      <link rel="apple-touch-icon" sizes="180x180" href="assets/images/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon-16x16.png">
      <link rel="mask-icon" href="assets/images/safari-pinned-tab.svg" color="#5bbad5">
      <link rel="manifest" href="manifest.json">

      <link rel="stylesheet" href="assets/styles/main.css">
      <link rel="stylesheet" href="assets/styles/page.css">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="pax.css">

      <script src="load-service-worker.js"></script>
      <script src="pax.js"></script>
      ${head}
    </head>

    <body>
      ${nav({ title })}
      <section class="page-container">
        ${header({ title })}
        <section class="body-container">
          ${body}
        </section>
      </section>
    </body>
  </html>
`;

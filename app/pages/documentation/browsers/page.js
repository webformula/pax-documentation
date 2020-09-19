import { Page } from '@webformula/pax-core';

export default class Browsers extends Page {
  get title() {
    return 'Browsers';
  }

  template() {
    return 'pages/documentation/browsers/page.html';
  }
}

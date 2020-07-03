import { Page } from '@webformula/pax-core';

export default class Browsers extends Page {
  get title() {
    return 'Browsers';
  }

  template() {
    return './page.html';
  }
}

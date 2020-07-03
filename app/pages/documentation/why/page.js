import { Page } from '@webformula/pax-core';

export default class Why extends Page {
  get title() {
    return 'Why?';
  }

  template() {
    return './page.html';
  }
}

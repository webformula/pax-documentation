import { Page } from '@webformula/pax-core';

export default class BuildingPages extends Page {
  get title() {
    return 'Building pages';
  }

  template() {
    return 'pages/documentation/building-pages/page.html';
  }
}

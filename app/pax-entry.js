import './components/anchor-link.js';
import './components/monaco-editor.js';
import './pages/documentation/basic-example/page.js';
import './pages/documentation/web-components.js';
import './pages/lets-build/component.js';

import { router } from '@webformula/pax-core';
import BasicExample from './pages/documentation/basic-example/page.js';
import Browsers from './pages/documentation/browsers/page.js';
import Buildingapp from './pages/documentation/building-entry.js';
import BuildingPages from './pages/documentation/building-pages/page.js';
import GettingStarted from './pages/documentation/quick-start/page.js';
import Routing from './pages/documentation/routing.js';
import ServiceWorker from './pages/documentation/service-worker.js';
import WebComponents from './pages/documentation/web-components.js';
import WebpackPage from './pages/documentation/webpack-bundle.js';
import Why from './pages/documentation/why/page.js';
import Examples from './pages/examples/examples.js';
import FourOFour from './pages/FourOFour.js';
import Introduction from './pages/introduction.js';
import Component from './pages/lets-build/component.js';
import Layout from './pages/lets-build/layout.js';
import SimplePage from './pages/lets-build/page.js';
import What from './pages/lets-build/what.js';
import WrapUp from './pages/lets-build/wrap-up.js';

router.addPageClass(BasicExample, 'documentation/basic-example');
router.addPageClass(Browsers, 'documentation/browsers');
router.addPageClass(Buildingapp, 'documentation/building-entry');
router.addPageClass(BuildingPages, 'documentation/building-pages');
router.addPageClass(GettingStarted, 'documentation/quick-start');
router.addPageClass(Routing, 'documentation/routing');
router.addPageClass(ServiceWorker, 'documentation/service-worker');
router.addPageClass(WebComponents, 'documentation/web-components');
router.addPageClass(WebpackPage, 'documentation/webpack-bundle');
router.addPageClass(Why, 'documentation/why');
router.addPageClass(Examples, 'examples/examples');
router.addPageClass(FourOFour, 'FourOFour');
router.addPageClass(Introduction, 'introduction');
router.addPageClass(Component, 'lets-build/component');
router.addPageClass(Layout, 'lets-build/layout');
router.addPageClass(SimplePage, 'lets-build');
router.addPageClass(What, 'lets-build/what');
router.addPageClass(WrapUp, 'lets-build/wrap-up');
router.setRoot('introduction');
router.init();
window.router = router;

export {
  router
};

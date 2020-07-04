class Page {
  constructor() {
    this._rendered = false;
    this.global = typeof globalThis !== 'undefined' ? globalThis : window;

    this._filePath = this._getCallerFilePath();
  }

  // called once page is rendered
  connectedCallback() {
    // Detect super?
    if (this.addEvents) this.addEvents();
  }

  // called once page is removed
  disconnectedCallback() {
    // Detect super?
    if (this.removeEvents) this.removeEvents();
  }

  // render page html
  async render() {
    if (this._disableRender === true) return;
    if (!this._templateSetup) await this._getTemplate();

    const renderBlock = document.querySelector('page-render-block:not(.previous)');
    if (!renderBlock) throw Error('Could not find <page-render-block>');

    if (this.removeEvents && this._rendered) this.removeEvents();
    if (this.beforeRender && this._rendered) this.beforeRender();
    renderBlock.innerHTML = `<style>${this.styles()}</style>${this._templateMethod()}`;
    if (this.afterRender) this.afterRender();
    if (this.addEvents) this.addEvents();

    this._rendered = true;
  }

  // Called before render(). placeholder, can be overidden
  // This does not include the initial cloneNode
  beforeRender() { }

  // Called after render(). placeholder, can be overidden
  // This does not include the initial cloneNode
  afterRender() { }

  // add css that will be injected to the template
  styles() { }

  // add html template, This will be used to create the template and direct render
  template() { }

  /* Load and prep template
   *   templates can be strings or urls
   */
  async _getTemplate() {
    if (this._templateSetup === true) return;

    const template = this.template();
    const isUrl = template.match(/.html$/);

    if (isUrl) {
      const possiblePath = new URL(template, this._filePath).pathname;

      // template from built template file
      if (window._templates && (window._templates[possiblePath] || window._templates[possiblePath.replace(/^\/+/, '')])) {
        this._templateMethod = new Function(`return \`${window._templates[possiblePath] || window._templates[possiblePath.replace(/^\/+/, '')]}\`;`);

      // load template url
      } else {
        // this._filePath is generated in the constructor
        const fileUrl = new URL(template, this._filePath);
        const response = await fetch(fileUrl);
        const str = await response.text();
        // allow javascript template string syntax in external html file ( ${things} )
        this._templateMethod = new Function(`return \`${str}\`;`);
      }
    } else {
      this._templateMethod = this.template;
    }

    this._templateSetup = true;
  }


  // hack way to utilize stack traces to get the caller's file path
  _getCallerFilePath() {
    // we are going to temporarily override this method. Keep for restore
    const originalPrepareStackTrace = Error.prepareStackTrace;
    let callerFile;

    try {
      // temporary change
      Error.prepareStackTrace = (_, stack) => stack;
      const err = new Error();
      let currentFile = err.stack.shift().getFileName();
      while (err.stack.length) {
        callerFile = err.stack.shift().getFileName();
        if (currentFile !== callerFile) break;
      }
    } catch (err) { }

    // restore original method
    Error.prepareStackTrace = originalPrepareStackTrace; 
    return callerFile;
  }
}

var router = new class {
  constructor() {
    this.routes = {};
    this.classReference = {};
    this.intercepter = undefined;

    this.pageClassnameRegex = /class\s(.*)\sextends/;
    this.bound_resolve = this._resolve.bind(this);

    // regexes for parsing uri's
    this.PARAMETER_REGEXP = /([:*])(\w+)/g;
    this.WILDCARD_REGEXP = /\*/g;
    this.REPLACE_VARIABLE_REGEXP = '([^\/]+)';
    this.REPLACE_WILDCARD = '(?:.*)';
    this.FOLLOWED_BY_SLASH_REGEXP = '(?:\/$|$)';
    this.MATCH_REGEXP_FLAGS = '';

    this._transitionPages = false;
    this.bound_onTransitionComplete = this._onTransitionComplete.bind(this);

    this.__mutationObserver = new MutationObserver(() => {
      if (window.activePage.connectedCallback) window.activePage.connectedCallback();
      this._stopWatchingForConnect();
    });
  }

  init() {
    // browser events for url changes
    window.addEventListener('hashchange', this.bound_resolve);
    window.addEventListener('DOMContentLoaded', () => {
      this._resolve(undefined, true);
    });
  }

  // allow intercepting of route changes
  // return false to prevent route change
  // return true to allow route change
  interceptRouteChange(callback) {
    if (typeof callback === 'function') this.intercepter = callback;
  }

  get transitionPages() {
    return this._transitionPages;
  }

  set transitionPages(value) {
    this._transitionPages = !!value;
  }

  get path() {
    let path = window.location.hash.replace(/.*#/, '');
    if (path.indexOf('?') > -1) path = path.split('?')[0];
    if (path.charAt(0) !== '/') path = '/' + path;
    return path;
  }

  get urlParameters() {
    const match = this._match(this.path);
    return match ? match.params : {};
  }

  get searchParamters() {
    return this._extractSearchParameters(this._clean(window.location.href)).split(',').filter(a => !!a).reduce((a, b) => {
      const split = b.split('=');
      a[split[0]] = split[1];
      return a;
    }, {});
  }

  set hash(value) {
    window.location = `#/${value}`;
  }
  
  setSearchParamter(name, value) {
    const parameters = this.searchParamters;
    if (value === undefined || value === null) delete parameters[name];
    else parameters[name] = value;
    let path = window.location.href.split('?')[0];
    if (Object.keys(parameters).length > 0) path += '?' + Object.keys(parameters).map(key => `${key}=${parameters[key]}`).join(',');

    window.history.pushState({ path }, '', path);
  }

  removeSearchParamter(name) {
    this.setSearchParamter(name, undefined);
  }

  addTransitionCSS() {
    if (this._addTransitionCSSAdded) return;
    document.body.insertAdjacentHTML('beforebegin', `<style>
      page-container {
        display: flex;
      }
      page-container.in-transition {
        overflow-x: hidden;
      }
      page-render-block {
        width: 100%;
        flex-shrink: 0;
        opacity: 1;
      }
      page-render-block.before-transition-page-out {
        pointer-events: none;
        user-select: none;
      }
      page-render-block.before-transition-page-in {
        transform: scale(0.9) translateX(-100%);
        opacity: 0;
      }
      page-render-block.transition-page-out {
        transform: scale(0.9);
        opacity: 0;
        transition: opacity .16s linear,
                    transform .26s cubic-bezier(0,0,.2,1);
      }
      page-render-block.transition-page-in {
        transform: scale(1) translateX(-100%);
        transform-origin: -50% 0;
        opacity: 1;
        transition: opacity .18s linear,
                    transform .26s cubic-bezier(0,0,.2,1);
      }
    </style>`);
    this._addTransitionCSSAdded = true;
  }

  addPageHideCSS() {
    if (this._addPageHideCSSAdded) return;
    document.body.insertAdjacentHTML('beforebegin', `<style>
      .mdw-hide-non-page-container {
        display: none;
      }
    </style>`);
    this._addPageHideCSSAdded = true;
  }

  // you can configure routes directly in the Page class
  addPageClass(Class, optionalPath) {
    const className = this.getClassName(Class, optionalPath);

    // handle optional path
    if (optionalPath) this.addPageClassPath(Class, optionalPath);

    // add routes from page class
    (Class.routes || []).forEach(path => {
      if (optionalPath === path) return;
      if (this.routes[path]) throw Error(`Path already exists: ${path}`);
      this.classReference[className] = Class;
      this.routes[path] = className;
    });
  }

  addPageClassPath(Class, path) {
    const className = this.getClassName(Class, path);
    if (this.routes[path]) throw Error(`Path already exists: ${optionalPath}`);
    this.classReference[className] = Class;
    this.routes[path] = className;
  }

  getClassName(Class, path) {
    const classMatch = this.pageClassnameRegex.exec(Class);
    return classMatch ? classMatch[1] : path.split('/').pop().replace('.js', '');
  }

  setRoot(className) {
    if (this.routes[className]) {
      const Class = this.classReference[this.routes[className]];
      this.addPageClassPath(Class, '/');
    } else {
      // className is actually class in this case
      this.addPageClassPath(className, '/');
    }
  }

  set404({ Class }) {
    if (Class) this._notFoundRouteClass = Class;
  }

  /* Hide all top level elements except for the page-container
   */
  showPageOnly() {
    const pageContainer = document.querySelector('page-container');
    const html = document.documentElement;
    let node = pageContainer;
    let sibling;
    let directPatent = pageContainer;

    while (node.parentNode && node.parentNode !== html) {
      node = node.parentNode;
      sibling = node.firstChild;
      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== directPatent) {
          sibling.classList.add('mdw-hide-non-page-container');
        }
        sibling = sibling.nextSibling;
      }
      directPatent = node;
    }
    this.addPageHideCSS();
    this._isShowingPageOnly = true;
  }

  /* un-hide non page-container elements
   */
  undoShowPageOnly() {
    if (this._isShowingPageOnly === true) {
      [...document.querySelectorAll('.mdw-hide-non-page-container') || []].forEach(el => el.classList.remove('mdw-hide-non-page-container'));
      this._isShowingPageOnly = false;
    }
  }

  // --- private ---

  _resolve(event, initial = false) {
    const { oldURL, newURL } = event || {};

    // no change
    if (initial === false && oldURL !== undefined && oldURL === newURL) return;

    const intercepterValue = this.intercepter ? this.intercepter(newURL, oldURL) : undefined;
    if (intercepterValue && intercepterValue.then && typeof intercepterValue.then === 'function') console.error('you cannot return a Promise to the router.intercepter callback. Expecting either true or false');
    if (intercepterValue === false) {
      window.history.go();
      return;
    }

    const path = this.path;
    const match = this._match(path);

    if (!match) {
      if (this._notFoundRouteClass) return this._changePage(this._notFoundRouteClass);
      else return console.warn('no page found');
    }
    if (initial && this._pageIsPreRendered()) return;

    let GETParameters = this._extractSearchParameters(this._clean(window.location.href));

    // prevent page change when no difference exists
    // this will cover the case of adding the #/ to the url
    if (oldURL !== undefined) {
      const urlDiff = oldURL.length > newURL.length ? oldURL.replace(newURL, '') : newURL.replace(oldURL, '');
      if (urlDiff === '' || urlDiff === '#/') return
    }

    // prevent page from loading on initial render
    return this._changePage(match);
  }

  _watchForConnect() {
    const renderBlock = document.querySelector('page-render-block:not(.previous)');
    this.__mutationObserver.observe(renderBlock, { childList: true });
  }

  _stopWatchingForConnect() {
    this.__mutationObserver.disconnect();
  }

  // check all possible scroll elements and reset them
  resetPageScroll() {
    const pageContent = document.querySelector('mdw-page mdw-page-content');
    if (pageContent && pageContent.scrollTop > 0) return pageContent.scrollTop = 0;

    const content = document.querySelector('mdw-page mdw-content');
    if (content && content.scrollTop > 0) return content.scrollTop= 0;

    const page = document.querySelector('mdw-page');
    if (page && page.scrollTop > 0) return page.scrollTop = 0;

    const body = document.querySelector('body');
    if (body.scrollTop > 0) return body.scrollTop = 0;

    const documentElement = document.documentElement;
    if (documentElement.scrollTop > 0) return documentElement.scrollTop = 0;
  }

  _changePage({ Class }) {
    if (!Class) throw Error('no class found');

    const pageContainer = document.querySelector('page-container');
    if (!pageContainer) throw Error('<page-container> required for router to work');

    //
    this._stopWatchingForConnect();
    this.undoShowPageOnly();

    const renderBlock = document.querySelector('page-render-block');

    // --- inital page ---
    // A page can have no pre-rendered pages.
    // create render-block and render page immidiatly
    if (!renderBlock) {
      pageContainer.appendChild(document.createElement('page-render-block'));

      // create page class instance
      window.activePage = new Class();
      this._watchForConnect();
      window.activePage.render();
      this.resetPageScroll();
      return;
    }

    // --- no transition ---
    // change page immediately if transitions are not on
    if (!this._transitionPages) {
      window.activePage.disconnectedCallback();

      // create page class instance
      window.activePage = new Class();
      this._watchForConnect();
      window.activePage.render();
      this.resetPageScroll();
      return;
    }


    //--- transiton ---

    // prep for current page transition out
    renderBlock.classList.add('previous');
    renderBlock.classList.add('before-transition-page-out');
    window.activePage._disableRender = true;
    window.activePage.disconnectedCallback();

    // build next page and prep for transition
    const nextRenderBlock = document.createElement('page-render-block');
    nextRenderBlock.classList.add('before-transition-page-in');
    renderBlock.insertAdjacentElement('afterend', nextRenderBlock);

    const pageInstance = new Class();
    window.activePage = pageInstance;
    this._watchForConnect();
    pageInstance.render();

    const pageTitle = document.querySelector('title');
    if (pageTitle) pageTitle.innerText = pageInstance.title;

    // --- transition ---
    pageContainer.classList.add('in-transition');

    // CONTINUE
    renderBlock.classList.add('transition-page-out');
    nextRenderBlock.classList.add('transition-page-in');

    renderBlock.addEventListener('transitionend', this.bound_onTransitionComplete);
    nextRenderBlock.addEventListener('transitionend', this.bound_onTransitionComplete);
  }

  _onTransitionComplete({ target }) {
    target.removeEventListener('transitionend', this.bound_onTransitionComplete);
    // remove old page
    if (target.classList.contains('transition-page-out')) target.remove();
    // remove animation state from new page
    else {
      target.classList.remove('before-transition-page-in');
      target.classList.remove('transition-page-in');
    }

    // remove transition state from page container
    if (!document.querySelector('page-render-block.previous') && !document.querySelector('page-render-block.next')) {
      document.querySelector('page-container').classList.remove('in-transition');
    }
  }


  _pageIsPreRendered() {
    const renderBlock = document.querySelector('page-render-block');
    if (renderBlock && renderBlock.children.length > 0) return true;
    return false;
  }

  _clean(str) {
    if (str instanceof RegExp) return s;
    return str.replace(/\/+$/, '').replace(/^\/+/, '/');
  }

  _extractSearchParameters(url) {
    return url.split(/\?(.*)?$/).slice(1).join('');
  }



  // --- matching ---

  _match(path) {
    let matched = this._findMatchedRoutes(path);
    if (!matched.length) return false;
    else if (matched.length === 1) return matched[0];
    else {
      return matched.sort((a, b) => {
        if (b.params) return 1;
        return -1;
      })[0];
    }
  }

  _findMatchedRoutes(url) {
    return Object.keys(this.routes)
      .map(route => {
        const className = this.routes[route];
        const { regexp, paramNames } = this._replaceDynamicURLParts(this._clean(route));
        const match = url.replace(/^\/+/, '/').match(regexp);
        const params = this._regExpResultToParams(match, paramNames);
        const Class = this.classReference[className];

        return !match ? false : {
          match,
          route,
          params,
          className,
          Class
        };
      })
      .filter(m => m && m.match[0] !== '');
  }

  _replaceDynamicURLParts(route) {
    let paramNames = [];
    let regexp = '';

    if (route instanceof RegExp) {
      regexp = route;
    } else {
      regexp = new RegExp(
        this._clean(route)
          .replace(this.PARAMETER_REGEXP, (full, dots, name) => {
            paramNames.push(name);
            return this.REPLACE_VARIABLE_REGEXP;
          })
          .replace(this.WILDCARD_REGEXP, this.REPLACE_WILDCARD) + this.FOLLOWED_BY_SLASH_REGEXP, this.MATCH_REGEXP_FLAGS
      );
    }
    return { regexp, paramNames };
  }

  _regExpResultToParams(match, names) {
    if (names.length === 0) return null;
    if (!match) return null;
    return match
      .slice(1, match.length)
      .reduce((params, value, index) => {
        if (params === null) params = {};
        params[names[index]] = decodeURIComponent(value);
        return params;
      }, null);
  }
};

class HTMLElementExtended extends HTMLElement {
  constructor() {
    super();
  }

  get _templateId() {
    return `${this.nodeName.toLowerCase()}--template`;
  }

  /* Clone from pre built htmlTemplate
   *   - Rerender: replaces html but not styles. This is usefull for dynamic templates
   */
  cloneTemplate(rerender) {
    let template = document.getElementById(this._templateId);
    
    // create template on the fly
    if (!template) template = this._createTemplate();

    const templateContent = template.content;
    const shadowRoot = this.shadowRoot ? this.shadowRoot : this.attachShadow({ mode: 'open' });
    const clone = templateContent.cloneNode(true);

    if (rerender) {
      // this.__isBuildProcess is present during the build process and will be undefined in the browser
      if (!this.__isBuildProcess && this.beforeRender) this.beforeRender();
      clone.querySelector('render-block').innerHTML = this.template();
    }

    shadowRoot.appendChild(clone);
    if (!this.__isBuildProcess && this.afterRender) this.afterRender();

  }

  _createTemplate() {
    const templateElement = document.createElement('template');
    templateElement.setAttribute('id', this._templateId);
    templateElement.innerHTML = `
        <style>
          ${this.styles()}
        </style>
        <render-block>
          ${this.template()}
        </render-block>
    `;
    document.body.insertAdjacentElement('beforeend', templateElement);
    return templateElement;
  }

  connectedCallback() {
    // Detect super?
    if (!this.__isBuildProcess && this.addEvents) this.addEvents();
  }

  disconnectedCallback() {
    // Detect super?
    if (!this.__isBuildProcess && this.removeEvents) this.removeEvents();
  }

  render() {
    // this.__isBuildProcess is present during the build process and will be undefined in the browser
    if (this.__isBuildProcess) return;

    const renderBlock = this.shadowRoot.querySelector('render-block');
    if (!renderBlock) throw Error('Could not find <render-block>');

    if (this.removeEvents) this.removeEvents();
    if (this.beforeRender) this.beforeRender();
    renderBlock.innerHTML = this.template();
    if (this.afterRender) this.afterRender();
    if (this.addEvents) this.addEvents();
  }

  // Called before render(). placeholder, can be overidden
  // This does not include the initial cloneNode
  beforeRender() { }

  // Called after render(). placeholder, can be overidden
  // This does not include the initial cloneNode
  afterRender() { }

  // this is called when the component is connected
  // This is also called after render, events are first remoed before render so you dont have multiple events
  addEvents() { }

  // this is called when the component is disconnected
  // This is also called prior to render, after render addEvents is called. This will make sure you old elements dont retain events
  removeEvents() { }

  // add css that will be injected to the template
  styles() { }

  // add css to the document root
  externalStyles() { }

  // add html template, This will be used to create the template and direct render
  template() { }
}

export { HTMLElementExtended, Page, router };

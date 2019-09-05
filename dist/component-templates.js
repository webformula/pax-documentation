// create custom element templates

var codemirror = document.createElement('template');
codemirror.setAttribute('id','code-mirror--template');
codemirror.innerHTML= `
  <style>
    
          @import "/styles/one-dark.css";
    
          @media screen and (max-width: 1084px) {
            :host {
              display: block;
              max-width: calc(100vw - 232px);
            }
          }
    
          pre {
            position: relative;
          }
    
          code {
            left: -160px;
            position: relative;
          }
        
  </style>
  <render-block>
    <pre class="cm-s-one-dark"><code></code></pre>
  </render-block>
`;
document.body.insertAdjacentElement('beforeend', codemirror);


var expandercontent = document.createElement('template');
expandercontent.setAttribute('id','expander-content--template');
expandercontent.innerHTML= `
  <style>
    :host {
      display: block;
      overflow: hidden;
      opacity: 0;
      max-height: 0;
      transition: max-height 0.12s cubic-bezier(0.25, 0.8, 0.25, 1),
                  opacity 0.12s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    
    :host(.show) {
      display: block;
    }
  </style>
  <render-block>
    <slot></slot>
  </render-block>
`;
document.body.insertAdjacentElement('beforeend', expandercontent);
var expanderheader = document.createElement('template');
expanderheader.setAttribute('id','expander-header--template');
expanderheader.innerHTML= `
  <style>
    
  </style>
  <render-block>
    <slot></slot>
  </render-block>
`;
document.body.insertAdjacentElement('beforeend', expanderheader);
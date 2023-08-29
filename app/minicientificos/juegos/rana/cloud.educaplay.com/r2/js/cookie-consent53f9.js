!function(t){var e={};function i(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(o,s,function(e){return t[e]}.bind(null,s));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);function o(t,e,i,o){var s,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const s="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},r=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${r}--\x3e`,c=new RegExp(`${r}|${a}`);class l{constructor(t,e){this.parts=[],this.element=e;const i=[],o=[],s=document.createTreeWalker(e.content,133,null,!1);let n=0,a=-1,l=0;const{strings:h,values:{length:f}}=t;for(;l<f;){const t=s.nextNode();if(null!==t){if(a++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let o=0;for(let t=0;t<i;t++)d(e[t].name,"$lit$")&&o++;for(;o-- >0;){const e=h[l],i=u.exec(e)[2],o=i.toLowerCase()+"$lit$",s=t.getAttribute(o);t.removeAttribute(o);const n=s.split(c);this.parts.push({type:"attribute",index:a,name:i,strings:n}),l+=n.length-1}}"TEMPLATE"===t.tagName&&(o.push(t),s.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(r)>=0){const o=t.parentNode,s=e.split(c),n=s.length-1;for(let e=0;e<n;e++){let i,n=s[e];if(""===n)i=p();else{const t=u.exec(n);null!==t&&d(t[2],"$lit$")&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(n)}o.insertBefore(i,t),this.parts.push({type:"node",index:++a})}""===s[n]?(o.insertBefore(p(),t),i.push(t)):t.data=s[n],l+=n}}else if(8===t.nodeType)if(t.data===r){const e=t.parentNode;null!==t.previousSibling&&a!==n||(a++,e.insertBefore(p(),t)),n=a,this.parts.push({type:"node",index:a}),null===t.nextSibling?t.data="":(i.push(t),a--),l++}else{let e=-1;for(;-1!==(e=t.data.indexOf(r,e+1));)this.parts.push({type:"node",index:-1}),l++}}else s.currentNode=o.pop()}for(const t of i)t.parentNode.removeChild(t)}}const d=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},h=t=>-1!==t.index,p=()=>document.createComment(""),u=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function f(t,e){const{element:{content:i},parts:o}=t,s=document.createTreeWalker(i,133,null,!1);let n=g(o),r=o[n],a=-1,c=0;const l=[];let d=null;for(;s.nextNode();){a++;const t=s.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(l.push(t),null===d&&(d=t)),null!==d&&c++;void 0!==r&&r.index===a;)r.index=null!==d?-1:r.index-c,n=g(o,n),r=o[n]}l.forEach(t=>t.parentNode.removeChild(t))}const m=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},g=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(h(e))return i}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const b=new WeakMap,y=t=>"function"==typeof t&&b.has(t),v={},_={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class x{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,o=document.createTreeWalker(t,133,null,!1);let n,r=0,a=0,c=o.nextNode();for(;r<i.length;)if(n=i[r],h(n)){for(;a<n.index;)a++,"TEMPLATE"===c.nodeName&&(e.push(c),o.currentNode=c.content),null===(c=o.nextNode())&&(o.currentNode=e.pop(),c=o.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,n.name,n.strings,this.options));r++}else this.__parts.push(void 0),r++;return s&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const w=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),S=` ${r} `;class k{constructor(t,e,i,o){this.strings=t,this.values=e,this.type=i,this.processor=o}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let o=0;o<t;o++){const t=this.strings[o],s=t.lastIndexOf("\x3c!--");i=(s>-1||i)&&-1===t.indexOf("--\x3e",s+1);const n=u.exec(t);e+=null===n?t+(i?S:a):t.substr(0,n.index)+n[1]+n[2]+"$lit$"+n[3]+r}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==w&&(e=w.createHTML(e)),t.innerHTML=e,t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const C=t=>null===t||!("object"==typeof t||"function"==typeof t),A=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class E{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new P(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!A(t))return t}let o="";for(let s=0;s<e;s++){o+=t[s];const e=i[s];if(void 0!==e){const t=e.value;if(C(t)||!A(t))o+="string"==typeof t?t:String(t);else for(const e of t)o+="string"==typeof e?e:String(e)}}return o+=t[e],o}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class P{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===v||C(t)&&t===this.value||(this.value=t,y(t)||(this.committer.dirty=!0))}commit(){for(;y(this.value);){const t=this.value;this.value=v,t(this)}this.value!==v&&this.committer.commit()}}class T{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(p()),this.endNode=t.appendChild(p())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=p()),t.__insert(this.endNode=p())}insertAfterPart(t){t.__insert(this.startNode=p()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=v,t(this)}const t=this.__pendingValue;t!==v&&(C(t)?t!==this.value&&this.__commitText(t):t instanceof k?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):A(t)?this.__commitIterable(t):t===_?(this.value=_,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof x&&this.value.template===e)this.value.update(t.values);else{const i=new x(e,t.processor,this.options),o=i._clone();i.update(t.values),this.__commitNode(o),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,o=0;for(const s of t)i=e[o],void 0===i&&(i=new T(this.options),e.push(i),0===o?i.appendIntoPart(this):i.insertAfterPart(e[o-1])),i.setValue(s),i.commit(),o++;o<e.length&&(e.length=o,this.clear(i&&i.endNode))}clear(t=this.startNode){n(this.startNode.parentNode,t.nextSibling,this.endNode)}}class N{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=v,t(this)}if(this.__pendingValue===v)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=v}}class $ extends E{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new j(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class j extends P{}let O=!1;(()=>{try{const t={get capture(){return O=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class R{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=v,t(this)}if(this.__pendingValue===v)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),o=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=M(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=v}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const M=t=>t&&(O?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function L(t){let e=F.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},F.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const o=t.strings.join(r);return i=e.keyString.get(o),void 0===i&&(i=new l(t,t.getTemplateElement()),e.keyString.set(o,i)),e.stringsArray.set(t.strings,i),i}const F=new Map,V=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const z=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(t,e,i,o){const s=e[0];if("."===s){return new $(t,e.slice(1),i).parts}if("@"===s)return[new R(t,e.slice(1),o.eventContext)];if("?"===s)return[new N(t,e.slice(1),i)];return new E(t,e,i).parts}handleTextExpression(t){return new T(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const U=(t,...e)=>new k(t,e,"html",z),q=(t,e)=>`${t}--${e}`;let B=!0;void 0===window.ShadyCSS?B=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),B=!1);const I=t=>e=>{const i=q(e.type,t);let o=F.get(i);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},F.set(i,o));let s=o.stringsArray.get(e.strings);if(void 0!==s)return s;const n=e.strings.join(r);if(s=o.keyString.get(n),void 0===s){const i=e.getTemplateElement();B&&window.ShadyCSS.prepareTemplateDom(i,t),s=new l(e,i),o.keyString.set(n,s)}return o.stringsArray.set(e.strings,s),s},H=["html","svg"],D=new Set,W=(t,e,i)=>{D.add(t);const o=i?i.element:document.createElement("template"),s=e.querySelectorAll("style"),{length:n}=s;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(o,t);const r=document.createElement("style");for(let t=0;t<n;t++){const e=s[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{H.forEach(e=>{const i=F.get(q(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),f(t,i)})})})(t);const a=o.content;i?function(t,e,i=null){const{element:{content:o},parts:s}=t;if(null==i)return void o.appendChild(e);const n=document.createTreeWalker(o,133,null,!1);let r=g(s),a=0,c=-1;for(;n.nextNode();){c++;for(n.currentNode===i&&(a=m(e),i.parentNode.insertBefore(e,i));-1!==r&&s[r].index===c;){if(a>0){for(;-1!==r;)s[r].index+=a,r=g(s,r);return}r=g(s,r)}}}(i,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(o,t);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(r,a.firstChild);const t=new Set;t.add(r),f(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const J={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},K=(t,e)=>e!==t&&(e==e||t==t),G={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:K};class Z extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const o=this._attributeNameForProperty(i,e);void 0!==o&&(this._attributeToPropertyMap.set(o,i),t.push(o))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=G){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const s=this[t];this[e]=o,this.requestUpdateInternal(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||G}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=K){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,o=e.converter||J,s="function"==typeof o?o:o.fromAttribute;return s?s(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,o=e.converter;return(o&&o.toAttribute||J.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=G){const o=this.constructor,s=o._attributeNameForProperty(t,i);if(void 0!==s){const t=o._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(s):this.setAttribute(s,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,o=i._attributeToPropertyMap.get(t);if(void 0!==o){const t=i.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let o=!0;if(void 0!==t){const s=this.constructor;i=i||s.getPropertyOptions(t),s._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}Z.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const Q=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function X(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Q(t,e)}function Y(t,e){return(i,o)=>{const s={get(){return this.renderRoot.querySelector(t)},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof o?Symbol():"__"+o;s.get=function(){return void 0===this[e]&&(this[e]=this.renderRoot.querySelector(t)),this[e]}}return void 0!==o?tt(s,i,o):et(s,i)}}const tt=(t,e,i)=>{Object.defineProperty(e,i,t)},et=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t});const it=Element.prototype;it.msMatchesSelector||it.webkitMatchesSelector;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const ot=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol();class nt{constructor(t,e){if(e!==st)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(ot?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const rt=(t,...e)=>{const i=e.reduce((e,i,o)=>e+(t=>{if(t instanceof nt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[o+1],t[0]);return new nt(i,st)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const at={};class ct extends Z{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),o=[];i.forEach(t=>o.unshift(t)),this._styles=o}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!ot){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new nt(String(e),st)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ot?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==at&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return at}}ct.finalized=!0,ct.render=(t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const o=i.scopeName,s=V.has(e),r=B&&11===e.nodeType&&!!e.host,a=r&&!D.has(o),c=a?document.createDocumentFragment():e;if(((t,e,i)=>{let o=V.get(e);void 0===o&&(n(e,e.firstChild),V.set(e,o=new T(Object.assign({templateFactory:L},i))),o.appendInto(e)),o.setValue(t),o.commit()})(t,c,Object.assign({templateFactory:I(o)},i)),a){const t=V.get(c);V.delete(c);const i=t.value instanceof x?t.value.template:void 0;W(o,c,i),n(e,e.firstChild),e.appendChild(c),V.set(e,t)}!s&&r&&window.ShadyCSS.styleElement(e.host)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const lt=new WeakMap,dt=(ht=t=>e=>{if(!(e instanceof T))throw new Error("unsafeHTML can only be used in text bindings");const i=lt.get(e);if(void 0!==i&&C(t)&&t===i.value&&e.value===i.fragment)return;const o=document.createElement("template");o.innerHTML=t;const s=document.importNode(o.content,!0);e.setValue(s),lt.set(e,{value:t,fragment:s})},(...t)=>{const e=ht(...t);return b.set(e,!0),e});var ht;function pt(t){return t.hasAttribute("hidden")||t.hasAttribute("aria-hidden")&&"false"!==t.getAttribute("aria-hidden")||"none"===t.style.display||"0"===t.style.opacity||"hidden"===t.style.visibility||"collapse"===t.style.visibility}function ut(t){return"-1"!==t.getAttribute("tabindex")&&!pt(t)&&!function(t){return t.hasAttribute("disabled")||t.hasAttribute("aria-disabled")&&"false"!==t.getAttribute("aria-disabled")}(t)&&(t.hasAttribute("tabindex")||(t instanceof HTMLAnchorElement||t instanceof HTMLAreaElement)&&t.hasAttribute("href")||t instanceof HTMLButtonElement||t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t instanceof HTMLSelectElement||t instanceof HTMLIFrameElement)}const ft=new Map;const mt=document.createElement("template");mt.innerHTML='\n\t<div id="start"></div>\n\t<div id="backup"></div>\n\t<slot></slot>\n\t<div id="end"></div>\n';class gt extends HTMLElement{constructor(){super(),this.debounceId=Math.random().toString(),this._focused=!1;const t=this.attachShadow({mode:"open"});t.appendChild(mt.content.cloneNode(!0)),this.$backup=t.querySelector("#backup"),this.$start=t.querySelector("#start"),this.$end=t.querySelector("#end"),this.focusLastElement=this.focusLastElement.bind(this),this.focusFirstElement=this.focusFirstElement.bind(this),this.onFocusIn=this.onFocusIn.bind(this),this.onFocusOut=this.onFocusOut.bind(this)}static get observedAttributes(){return["inactive"]}get inactive(){return this.hasAttribute("inactive")}set inactive(t){t?this.setAttribute("inactive",""):this.removeAttribute("inactive")}get focused(){return this._focused}connectedCallback(){this.$start.addEventListener("focus",this.focusLastElement),this.$end.addEventListener("focus",this.focusFirstElement),this.addEventListener("focusin",this.onFocusIn),this.addEventListener("focusout",this.onFocusOut),this.render()}disconnectedCallback(){this.$start.removeEventListener("focus",this.focusLastElement),this.$end.removeEventListener("focus",this.focusFirstElement),this.removeEventListener("focusin",this.onFocusIn),this.removeEventListener("focusout",this.onFocusOut)}attributeChangedCallback(){this.render()}focusFirstElement(){this.trapFocus()}focusLastElement(){this.trapFocus(!0)}getFocusableElements(){return function t(e,i,o,s=20,n=0){let r=[];if(n>=s)return r;const a=e=>{const r=e.assignedNodes().filter(t=>1===t.nodeType);return r.length>0?t(r[0].parentElement,i,o,s,n+1):[]},c=Array.from(e.children||[]);for(const e of c)i(e)||(o(e)&&r.push(e),null!=e.shadowRoot?r.push(...t(e.shadowRoot,i,o,s,n+1)):"SLOT"===e.tagName?r.push(...a(e)):r.push(...t(e,i,o,s,n+1)));return r}(this,pt,ut)}trapFocus(t){if(this.inactive)return;let e=this.getFocusableElements();e.length>0?(t?e[e.length-1].focus():e[0].focus(),this.$backup.setAttribute("tabindex","-1")):(this.$backup.setAttribute("tabindex","0"),this.$backup.focus())}onFocusIn(){this.updateFocused(!0)}onFocusOut(){this.updateFocused(!1)}updateFocused(t){!function(t,e,i){const o=ft.get(i);null!=o&&window.clearTimeout(o),ft.set(i,window.setTimeout(()=>{t(),ft.delete(i)},e))}(()=>{this.focused!==t&&(this._focused=t,this.render())},0,this.debounceId)}render(){this.$start.setAttribute("tabindex",!this.focused||this.inactive?"-1":"0"),this.$end.setAttribute("tabindex",!this.focused||this.inactive?"-1":"0"),this.focused?this.setAttribute("focused",""):this.removeAttribute("focused")}}window.customElements.define("focus-trap",gt);class bt extends ct{constructor(){super(...arguments),this.name="",this.controls="default",this.status="",this.textAccept="Aceptar",this.textReject="Rechazar"}optionChange(t){const{name:e,value:i}=t.target,o=new CustomEvent("change",{detail:{name:e,status:i}});this.dispatchEvent(o)}render(){return U`
    <div class="cookie">
      <div class="cookie__content">
        <div class="cookie__title">
          <slot name="title"></slot>
        </div>
        <div class="cookie__details">
          <slot name="description"></slot>
        </div>
      </div>
      ${"hidden"!==this.controls?U`
        <div class="cookie__actions" data-test-id="controls">
          <label class="option option--reject">
            <input
              type="radio"
              name=${this.name}
              value="rejected"
              ?disabled=${"readonly"===this.controls}
              @change=${this.optionChange}
              ?checked=${"rejected"===this.status}
            />
            <span>${this.textReject}</span>
          </label>
          <label class="option option--accept">
            <input
              type="radio"
              name=${this.name}
              value="accepted"
              ?checked=${"accepted"===this.status||"readonly"===this.controls}
              @change=${this.optionChange}
            />
            <span>${this.textAccept}</span>
          </label>
        </div>
      `:""}
    </div>
    `}}bt.styles=rt`
    .cookie {
      padding: 21px 0;
    }
    .cookie__title {
      font-weight: 600;
      margin-bottom: 8px;
      font-size: 15px;
    }
    .cookie__details {
      color: var(--cookie-consent-text-light-color, #656565);
      margin-bottom: 16px;
    }
    .cookie__actions {
      display: flex;
    }
    @media (min-width: 880px) {
      .cookie {
        display: flex;
      }
      .cookie__content {
        flex-grow: 1;
      }
      .cookie__details {
        margin-bottom: 0;
      }
      .cookie__actions {
        flex: 0 0 25%;
        margin-left: 24px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
      }
    }
    .option span {
      display: inline-block;
      padding: 8px 20px;
      background: var(--cookie-consent-option-bg, #F3F4F6);
      cursor: pointer;
      border-radius: var(--cookie-consent-option-radius, 3px);
    }
    .option input {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
    .option--accept {
      margin-left: 4px;
    }
    .option input:checked + span {
      color: #ffffff;
    }
    .option--accept input:checked + span {
      background: var(--cookie-consent-option-accepted-bg, #6EB118);
    } 
    .option--reject input:checked + span {
      background-color: var(--cookie-consent-option-rejected-bg, #DC003B);
    }
    .option--reject input:disabled + span {
      color: var(--cookie-consent-option-disabled-color, #9EA3B1);
      cursor: not-allowed;
    }
  `,o([X({type:String})],bt.prototype,"name",void 0),o([X({type:String})],bt.prototype,"controls",void 0),o([X({type:String})],bt.prototype,"status",void 0),o([X({type:String,attribute:"text-accept"})],bt.prototype,"textAccept",void 0),o([X({type:String,attribute:"text-reject"})],bt.prototype,"textReject",void 0),customElements.define("cookie-consent-card",bt);var yt=rt`
:host {
    --_content-padding: 16px;
}

@media(min-width: 480px) {
    :host {
        --_content-padding: 24px 32px;
    }
}

@media(min-width: 980px) {
    :host {
        --_content-padding: 24px 48px;
    }
}

:host * {
    box-sizing: border-box;
}

.outline-0 {
    outline: none;
}

button {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
}

button:disabled {
    cursor: not-allowed;
}

.cookie-consent {
    font-size: 14px;
    line-height: 19px;
}

.backdrop {
    display: inline-block;
    position: fixed;
    min-height: fit-content;
    width: fit-content;
    z-index: var(--cookie-consent-z-index, 99999);
}

:host([lock-navigation]) .backdrop {
    background-color: var(--cookie-consent-backdrop-background, rgba(60, 64, 67, 0.74));
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
}

:host([position="bottom"]) .backdrop {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    align-items: flex-end;
}

:host([position="top"]) .backdrop {
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    align-items: flex-start;
}

:host([position="left"]) .backdrop {
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    justify-content: left;
}

:host([position="right"]) .backdrop {
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    justify-content: right;
}

:host([position="center"]) .backdrop,
:host([config-opened]) .backdrop {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    justify-content: center;
}

.modal-container {
    padding: var(--_content-padding);
    background-color: #ffffff;
    width: 100%;
    max-height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: var(--cookie-consent-shadow, 0 0 68px rgba(0, 0, 0, .25));
}

.first-modal {
    background: var(--cookie-consent-bg, #ffffff);
    backdrop-filter:  var(--cookie-consent-backdrop-filter, inherit);
    border-radius: var(--cookie-consent-content-radius, 12px);
    color: var(--cookie-consent-color, inherit);
}

:host([position="left"]) .first-modal,
:host([position="right"]) .first-modal,
:host([position="center"]) .first-modal {
    max-width: 588px;
}

:host([position="left"]) .first-modal {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

:host([position="right"]) .first-modal {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

:host([position="top"]) .first-modal {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

:host([position="bottom"]) .first-modal {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.notice-container {
    max-height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;
}

.modal-container {
    max-height: calc(100vh - 40px);
}

.modal-container-content {
    flex-grow: 1;
    overflow: auto;
    margin-bottom: 24px;
}

@media(min-width: 620px) {
    :host(:not([config-opened])) .modal-container-content {
        margin-bottom: 0;
    }
}

.modal-container[data-size="large"] {
    max-width: none;
    max-height: none;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
}

.scrollable {
    overflow: auto;
}

.actions {
    display: flex;
    flex-direction: column;
}

.actions > button {
    width: 100%;
}

.actions > button:not(:last-child) {
    margin-bottom: 8px;
}

@media(min-width: 520px) {
    .notice-container {
        max-height: calc(100vh - 80px);
    }

    .modal-container[data-size="large"] {
        max-height: 74vh;
        max-width: 948px;
        border-radius: var(--cookie-consent-content-radius, 12px);
    }

    .actions {
        flex-direction: row;
        justify-content: flex-end;
        flex-shrink: 0;
    }

    .actions--reverse {
        flex-direction: row-reverse;
        justify-content: flex-start;
    }

    .actions > button {
        width: auto;
    }

    .actions > button:not(:last-child) {
        margin-bottom: 0;
    }

    .actions:not(.actions--reverse) > button:not(:last-child) {
        margin-right: 8px;
    }
}

@media(min-width: 520px) and (max-height: 520px) {
    .modal-container[data-size="large"] {
        max-height: calc(100vh - 24px);
    }
}

@media(min-width: 520px) and (min-height: 820px) {
    .modal-container[data-size="large"] {
        max-height: 60vh;
    }
}

.cookies {
    border-radius: var(--cookie-consent-content-inner-radius, 3px);
    border: 1px solid var(--cookie-consent-border-color, #DFE2EB);
    padding: 0 24px;
}

.cookies-list,
.cookies-list > li {
    margin: 0;
    padding: 0;
    list-style: none;
}

.cookies-list > li:not(:last-child) {
    border-bottom: 1px solid var(--cookie-consent-border-light-color, rgba(223, 226, 235, .65));
}

.close-button {
    border: 0;
    background: transparent;
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 8px 12px;
}

.button-link,
.button-primary {
    height: var(--cookie-consent-button-height, 48px);
    display: inline-flex;
    border-radius: var(--cookie-consent-button-radius, 5px);
    justify-content: center;
    align-items: center;
    padding: 0 24px;
    border: 0;
    font-weight: var(--cookie-consent-button-font-weight, 400);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.button-primary {
    color: var(--cookie-consent-button-color, #ffffff);
    background: var(--cookie-consent-button-bg, #6EB118);
    font-size: var(--cookie-consent-button-font-size, 16px);
}

.button-link {
    background:var(--cookie-consent-button-secondary-bg, transparent);
    color: var(--cookie-consent-button-secondary-color, #6EB118);
    font-size: var(--cookie-consent-button-font-size, 16px);
    height: var(--cookie-consent-button-height, 48px);
}

.button-primary:disabled  {
    background: var(--cookie-consent-button-disabled-bg, #E9EAED);
    color:  var(--cookie-consent-button-disabled-color, #949AA5);
}

@media(min-width: 880px) {
    .button-primary,
    .button-link {
        padding: 0 36px;
    }

    .close-button {
        top: 16px;
        right: 16px;
    }
}

@media(min-width: 1024px) {
    .button-primary {
        padding: 0 40px;
    }
}

.config-title {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.2;
    padding: 0;
    margin: 0 0 8px;
}

.config-info {
    padding: 16px 0;
}
`;class vt extends ct{constructor(){super(...arguments),this._cookies=[],this.openFromConfig=!1,this.enableClose=!1,this.textConfig="Configurar",this.textAccept="Aceptar",this.textReject="Rechazar",this.textAcceptAll="Aceptar todas y cerrar",this.textRejectAll="Rechazar todas y cerrar",this.textSave="Guardar y cerrar",this.textClose="Cerrar",this.TextConfigTitle="Configuraci�n",this.TextConfigDescription='Al pulsar "Guardar y cerrar" se guardar� la selecci�n de cookies que hayas realizado. Si pulsas sobre "Aceptar todas y cerrar" aceptar�s todas las cookies. Si pulsas sobre "Rechazar todas y cerrar" rechazar�s todas las cookies. La aceptaci�n de algunos grupos de cookies se realiza mediante algunas acciones explicitas que vienen detalladas debajo.',this.centerNavigation=!1,this.opened=!1,this.configOpened=!1}get cookies(){return this._cookies}set cookies(t){const e=this._cookies;this._cookies=t;const i=this._cookies.filter(t=>"default"===t.controls&&""===t.status);this.enableClose=0!==i.length,this.requestUpdate("cookies",e)}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._handleKeyDown.bind(this))}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._handleKeyDown.bind(this))}_handleKeyDown(t){"Escape"===t.key&&this.closeConfig()}async closeConfig(){this.configOpened&&(this.configOpened=!1,this.openFromConfig?this.opened=!1:(await this.updateComplete,this.$notice.focus()))}async open(){this.opened=!0,await this.updateComplete,this.$notice.focus()}openConfig(){this.opened=!0,this.openFromConfig=!0,this._openConfig()}async _openConfig(){this.configOpened=!0,await this.updateComplete,this.$config.focus()}getCookiesAcceptedName(){return this.cookies.map(t=>"accepted"===t.status&&t.name).filter(Boolean)}getRequiredCookies(){return this.cookies.map(t=>("hidden"===t.controls||"readonly"===t.controls)&&t.name).filter(Boolean)}close(){const t=this.getCookiesAcceptedName(),e=new CustomEvent("cookies-status-changed",{detail:{consent:t}});this.dispatchEvent(e),this.opened=!1,this.configOpened=!1}acceptAllAndClose(){this.cookies=this.cookies.map((t,e)=>(t.status="accepted",t));const t=this.cookies.map(t=>t.name),e=new CustomEvent("cookies-status-changed",{detail:{consent:t}});this.dispatchEvent(e),this.opened=!1,this.configOpened=!1}rejectAllAndClose(){this.cookies=this.cookies.map(t=>("hidden"===t.controls||"readonly"===t.controls?t.status="accepted":t.status="rejected",t));const t=this.getRequiredCookies(),e=new CustomEvent("cookies-status-changed",{detail:{consent:t}});this.dispatchEvent(e),this.opened=!1,this.configOpened=!1}changeCookie(t){t.stopPropagation();const{name:e,status:i}=t.detail;this.cookies=this.cookies.map(t=>t.name===e?{...t,status:i}:t)}render(){return U`
      <div class="backdrop cookie-consent" ?hidden=${!this.opened}>
        <focus-trap id="modal"> 
          ${this.configOpened?U`
                <div
                  class="modal-container outline-0"
                  id="config"
                  data-size="large"
                  tabindex="-1"
                >
                  <div class="modal-container__header">
                    <button class="close-button" @click=${this.closeConfig}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14.384"
                        height="14.384"
                        viewBox="0 0 14.384 14.384"
                        aria-label=${this.textClose}
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M21.884,8.949,20.435,7.5l-5.743,5.743L8.949,7.5,7.5,8.949l5.743,5.743L7.5,20.435l1.449,1.449,5.743-5.743,5.743,5.743,1.449-1.449L16.14,14.692Z"
                          transform="translate(-7.5 -7.5)"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    <div class="config-info">
                      <h2 class="config-title">
                        ${dt(this.TextConfigTitle)}
                      </h2>
                      <div class="config-details">
                        ${dt(this.TextConfigDescription)}
                      </div>
                    </div>
                  </div>
                  <div class="modal-container-content cookies">
                    <div class="scrollable">
                      <ul class="cookies-list">
                        ${this.cookies.map(t=>U` <li>
                            <cookie-consent-card
                              text-accept=${this.textAccept}
                              text-reject=${this.textReject}
                              name=${t.name}
                              controls=${t.controls}
                              status=${t.status}
                              @change=${this.changeCookie}
                            >
                              <div slot="title">
                                ${dt(t.title)}
                              </div>
                              <div slot="description">
                                ${dt(t.description)}
                              </div>
                            </cookie-consent-card>
                          </li>`)}
                      </ul>
                    </div>
                  </div>
                  <div class="modal-container-footer actions">
                    <button
                      class="button-primary"
                      @click=${this.rejectAllAndClose}
                    >
                      ${dt(this.textRejectAll)}
                    </button>
                    <button
                      class="button-primary"
                      @click=${this.acceptAllAndClose}
                    >
                      ${this.textAcceptAll}
                    </button>
                    <button
                      class="button-primary"
                      data-test-id="save-button"
                      ?disabled=${this.enableClose}
                      @click=${this.close}
                    >
                    ${this.textSave}
                    </button>
                  </div>
                </div>
              `:U`
                <div class="modal-container first-modal">
                  <div class="notice-container">
                    <div
                      id="notice"
                      tabindex="-1"
                      class="modal-container-content scrollable outline-0"
                    >
                      <slot></slot>
                    </div>
                    <div class="actions actions--reverse">
                      <button
                        class="button-primary"
                        @click=${this.acceptAllAndClose}
                      >
                        ${dt(this.textAccept)}
                      </button>
                      <button class="button-link" @click=${this._openConfig}>
                        ${dt(this.textConfig)}
                      </button>
                    </div>
                  </div>
                </div>
              `}
        </focus-trap>
      </div>
    `}}vt.styles=[yt,rt`
      :host {
        display: block;
      }
      [hidden][hidden] {
        display: none;
      }
    `],o([X({type:String,attribute:"text-config"})],vt.prototype,"textConfig",void 0),o([X({type:String,attribute:"text-accept"})],vt.prototype,"textAccept",void 0),o([X({type:String,attribute:"text-reject"})],vt.prototype,"textReject",void 0),o([X({type:String,attribute:"text-accept-all"})],vt.prototype,"textAcceptAll",void 0),o([X({type:String,attribute:"text-reject-all"})],vt.prototype,"textRejectAll",void 0),o([X({type:String,attribute:"text-save"})],vt.prototype,"textSave",void 0),o([X({type:String,attribute:"text-close"})],vt.prototype,"textClose",void 0),o([X({type:String,attribute:"text-config-title"})],vt.prototype,"TextConfigTitle",void 0),o([X({type:String,attribute:"text-config-description"})],vt.prototype,"TextConfigDescription",void 0),o([X({type:Boolean,attribute:"center-navigation"})],vt.prototype,"centerNavigation",void 0),o([X({type:Array,attribute:!0,reflect:!0})],vt.prototype,"cookies",null),o([X({type:Boolean,attribute:!1})],vt.prototype,"opened",void 0),o([X({type:Boolean,attribute:"config-opened",reflect:!0})],vt.prototype,"configOpened",void 0),o([Y("#notice")],vt.prototype,"$notice",void 0),o([Y("#config")],vt.prototype,"$config",void 0),o([Y(".close-button")],vt.prototype,"$closeButton",void 0),window.customElements.define("cookie-consent",vt)}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{338:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return c})),n.d(t,"default",(function(){return o}));n(19),n(5),n(6),n(3),n(11),n(7),n(0);var a=n(94),r=n(350);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var c={},l={_frontmatter:c},i=r.a;function o(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.mdx)(i,s({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.mdx)("nav",{className:"toc"},Object(a.mdx)("ol",s({parentName:"nav"},{className:"toc-level toc-level-1"}),Object(a.mdx)("li",s({parentName:"ol"},{className:"toc-item toc-item-h1"}),Object(a.mdx)("a",s({parentName:"li"},{className:"toc-link toc-link-h1",href:"#examples"}),"Examples"),Object(a.mdx)("ol",s({parentName:"li"},{className:"toc-level toc-level-2"}),Object(a.mdx)("li",s({parentName:"ol"},{className:"toc-item toc-item-h2"}),Object(a.mdx)("a",s({parentName:"li"},{className:"toc-link toc-link-h2",href:"#tabs"}),"Tabs")),Object(a.mdx)("li",s({parentName:"ol"},{className:"toc-item toc-item-h2"}),Object(a.mdx)("a",s({parentName:"li"},{className:"toc-link toc-link-h2",href:"#data"}),"Data")))))),Object(a.mdx)("h1",{id:"examples"},"Examples"),Object(a.mdx)("h2",{id:"tabs"},"Tabs"),Object(a.mdx)("ul",null,Object(a.mdx)("li",{parentName:"ul"},Object(a.mdx)("a",s({parentName:"li"},{href:"/misk-web/docs/examples/starter-basic"}),"starter-basic"),": basic example tab used in ",Object(a.mdx)("inlineCode",{parentName:"li"},"$ miskweb new")),Object(a.mdx)("li",{parentName:"ul"},Object(a.mdx)("a",s({parentName:"li"},{href:"/misk-web/docs/examples/palette-exemplar"}),"palette-exemplar"),": tab with more complex examples for forms, network requests, and router path parameters"),Object(a.mdx)("li",{parentName:"ul"},Object(a.mdx)("a",s({parentName:"li"},{href:"/misk-web/docs/examples/palette-lts"}),"palette-lts"),": palette-exemplar but using deprecated ",Object(a.mdx)("inlineCode",{parentName:"li"},"@misk/simpleredux")," APIs to ensure continued support of old APIs")),Object(a.mdx)("h2",{id:"data"},"Data"),Object(a.mdx)("ul",null,Object(a.mdx)("li",{parentName:"ul"},Object(a.mdx)("a",s({parentName:"li"},{href:"/misk-web/docs/examples/data"}),"data"),": mock data sets to develop against")))}o.isMDXComponent=!0},350:function(e,t,n){"use strict";n(50),n(24),n(14),n(68);var a=n(37),r=n.n(a),s=n(0),c=n.n(s),l=n(106),i=n(54),o=n(53),m=n(89),u=Object(s.createContext)("undefined"!=typeof HTMLElement?Object(l.a)():null),p=Object(s.createContext)({}),h=(u.Provider,function(e){return Object(s.forwardRef)((function(t,n){return Object(s.createElement)(u.Consumer,null,(function(a){return e(t,a,n)}))}))}),d="__EMOTION_TYPE_PLEASE_DO_NOT_USE__",b=Object.prototype.hasOwnProperty,f=function(e,t,n,a){var r=t[d],c=[],l="",m=null===n?t.css:t.css(n);"string"==typeof m&&void 0!==e.registered[m]&&(m=e.registered[m]),c.push(m),void 0!==t.className&&(l=Object(i.a)(e.registered,c,t.className));var u=Object(o.a)(c);Object(i.b)(e,u,"string"==typeof r);l+=e.key+"-"+u.name;var p={};for(var h in t)b.call(t,h)&&"css"!==h&&h!==d&&(p[h]=t[h]);return p.ref=a,p.className=l,Object(s.createElement)(r,p)},O=h((function(e,t,n){return"function"==typeof e.css?Object(s.createElement)(p.Consumer,null,(function(a){return f(t,e,a,n)})):f(t,e,null,n)}));var j=function(e,t){var n=arguments;if(null==t||null==t.css)return s.createElement.apply(void 0,n);var a=n.length,r=new Array(a);r[0]=O;var c={};for(var l in t)b.call(t,l)&&(c[l]=t[l]);c[d]=e,r[1]=c;for(var i=2;i<a;i++)r[i]=n[i];return s.createElement.apply(null,r)},x=h((function(e,t){var n=e.styles;if("function"==typeof n)return Object(s.createElement)(p.Consumer,null,(function(e){var a=Object(o.a)([n(e)]);return Object(s.createElement)(v,{serialized:a,cache:t})}));var a=Object(o.a)([n]);return Object(s.createElement)(v,{serialized:a,cache:t})})),v=function(e){function t(t,n,a){return e.call(this,t,n,a)||this}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){this.sheet=new m.a({key:this.props.cache.key+"-global",nonce:this.props.cache.sheet.nonce,container:this.props.cache.sheet.container});var e=document.querySelector("style[data-emotion-"+this.props.cache.key+'="'+this.props.serialized.name+'"]');null!==e&&this.sheet.tags.push(e),this.props.cache.sheet.tags.length&&(this.sheet.before=this.props.cache.sheet.tags[0]),this.insertStyles()},n.componentDidUpdate=function(e){e.serialized.name!==this.props.serialized.name&&this.insertStyles()},n.insertStyles=function(){if(void 0!==this.props.serialized.next&&Object(i.b)(this.props.cache,this.props.serialized.next,!0),this.sheet.tags.length){var e=this.sheet.tags[this.sheet.tags.length-1].nextElementSibling;this.sheet.before=e,this.sheet.flush()}this.props.cache.insert("",this.props.serialized,this.sheet,!1)},n.componentWillUnmount=function(){this.sheet.flush()},n.render=function(){return null},t}(s.Component),y=function e(t){for(var n=t.length,a=0,r="";a<n;a++){var s=t[a];if(null!=s){var c=void 0;switch(typeof s){case"boolean":break;case"object":if(Array.isArray(s))c=e(s);else for(var l in c="",s)s[l]&&l&&(c&&(c+=" "),c+=l);break;default:c=s}c&&(r&&(r+=" "),r+=c)}}return r};function g(e,t,n){var a=[],r=Object(i.a)(e,a,n);return a.length<2?n:r+t(a)}h((function(e,t){return Object(s.createElement)(p.Consumer,null,(function(n){var a=function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];var r=Object(o.a)(n,t.registered);return Object(i.b)(t,r,!1),t.key+"-"+r.name},r={css:a,cx:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return g(t.registered,a,y(n))},theme:n},s=e.children(r);return!0,s}))}));var N=n(58),k=n(123),w=n(168),E=n(164);t.a=function(e){return j(c.a.Fragment,null,j(x,{styles:Object(N.h)({"*":{boxSizing:"border-box"},body:{margin:0,color:"text",bg:"background",fontFamily:"body"}})}),j(k.b,null,j(E.a,null),j(w.a,null),j(k.c,null,j(k.a,null,e.children))))}}}]);
//# sourceMappingURL=component---pages-examples-md-2af422c326d9d38d140f.js.map
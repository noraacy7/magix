define("magix/magix",function(){[].slice;var e=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,t=/\/[^\/]*$/,n=/[#?].*$/,r="",i=/([^=&?\/#]+)=([^&=#?]*)/g,a="pathname",o=/^https?:\/\//i,c={},s=0,f="/",u="vframe",v={iniFile:"app/ini",appName:"app",appHome:"./",tagName:u,rootId:"magix_vf_root"},p=c.hasOwnProperty,l=function(e){return function(t,n,r){switch(arguments.length){case 0:r=e;break;case 1:r=C.isObject(t)?g(e,t):m(e,t)?e[t]:null;break;case 2:null===n?(delete e[t],r=n):e[t]=r=n}return r}},d=function(e){var t=this;t.c=[],t.x=e||20,t.b=t.x+5},h=function(e){return new d(e)},m=function(e,t){return e?p.call(e,t):0},g=function(e,t,n){for(var r in t)n&&m(n,r)||(e[r]=t[r]);return e};g(d.prototype,{get:function(e){var t,n=this,r=n.c;return e=a+e,m(r,e)&&(t=r[e],t.f>=1&&(t.f++,t.t=s++,t=t.v)),t},set:function(e,t){var n=this,r=n.c;e=a+e;var i=r[e];if(!m(r,e)){if(r.length>=n.b){r.sort(function(e,t){return t.f==e.f?t.t-e.t:t.f-e.f});for(var o=n.b-n.x;o--;)i=r.pop(),delete r[i.k]}i={},r.push(i),r[e]=i}return i.k=e,i.v=t,i.f=1,i.t=s++,i},del:function(e){e=a+e;var t=this.c,n=t[e];n&&(n.f=-1e5,n.v=r,delete t[e])},has:function(e){return e=a+e,m(this.c,e)}});var x=h(60),w=h(),b=function(e,t,n,r,i,a){for(C.isArray(e)||(e=[e]),t&&(C.isArray(t)||t.callee)||(t=[t]),r=0;e.length>r;r++)try{a=e[r],i=C.isFunction(a)&&a.apply(n,t)}catch(o){}return i},y=function(){},C={isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},mix:g,has:m,safeExec:b,noop:y,config:l(v),start:function(e){var t=this;e=g(v,e),t.libEnv(e),e.ready&&(b(e.ready),delete e.ready),t.libRequire(e.iniFile,function(n){v=g(e,n,e),v.tagNameChanged=v.tagName!=u;var r=e.progress;t.libRequire(["magix/router","magix/vom"],function(n,i){n.on("!ul",i.locChged),n.on("changed",i.locChged),r&&i.on("progress",r),t.libRequire(e.extensions,n.start)})})},keys:Object.keys||function(e){var t=[];for(var n in e)m(e,n)&&t.push(n);return t},local:l({}),path:function(i,a){var c=i+"\n"+a,s=w.get(c);if(!s){if(o.test(a))s=a;else if(i=i.replace(n,r).replace(t,r)+f,a.charAt(0)==f){var u=o.test(i)?8:0,v=i.indexOf(f,u);s=i.substring(0,v)+a}else s=i+a;for(;e.test(s);)s=s.replace(e,"$1/");w.set(c,s)}return s},pathToObject:function(e,t){var c=x.get(e);if(!c){var c={},s={},u=r;if(n.test(e)?u=e.replace(n,r):~e.indexOf("=")||(u=e),u&&o.test(u)){var v=u.indexOf(f,8);u=-1==v?f:u.substring(v)}e.replace(i,function(e,n,r){if(t)try{r=decodeURIComponent(r)}catch(i){}s[n]=r}),c[a]=u,c.params=s,x.set(e,c)}return c},objectToPath:function(e,t){var n,r=e[a],i=[],o=e.params;for(var c in o)n=o[c],t&&encodeURIComponent(n),i.push(c+"="+n);return i.length&&(r=r+"?"+i.join("&")),r},tmpl:function(e,t){return 1==arguments.length?{v:c[e],h:m(c,e)}:c[e]=t},listToMap:function(e,t){var n,r,i,a={};if(C.isString(e)&&(e=e.split(",")),e&&(i=e.length))for(n=0;i>n;n++)r=e[n],a[t?r[t]:r]=t?r:1;return a},cache:h},E=Object.prototype.toString;return g(C,{libRequire:function(e,t){e?seajs.use(e,t):t&&t()},libEnv:function(e){var t=this,n=e.appHome,i=location;i.protocol;var a=e.appName;n=t.path(i.href,n+f),e.appHome=n;var o=e.debug;o&&(o=0==n.indexOf(i.protocol+f+f+i.host+f));var c=r;c=o?Date.now():e.appTag,c&&(c+=".js");var s={};s[a]=n+a+"/",seajs.config({paths:s})},isArray:$.isArray,isFunction:$.isFunction,isObject:function(e){return"[object Object]"==E.call(e)},isString:function(e){return"[object String]"==E.call(e)},isNumber:function(e){return"[object Number]"==E.call(e)},isRegExp:function(e){return"[object RegExp]"==E.call(e)},extend:function(e,t,n,r){e.superclass=t.prototype;var i=function(){};return i.prototype=t.prototype,e.prototype=new i,C.mix(e.prototype,n),C.mix(e,r),e.prototype.constructor=e,e}})}),define("magix/router",["magix/magix","magix/event"],function(e){var t,n,r,i,a,o=e("magix/magix"),c=e("magix/event"),s=window,f="",u="pathname",v=o.has,p=o.mix,l=document,d=/^UTF-8$/i.test(l.charset||l.characterSet||"UTF-8"),h=o.config(),m=o.cache(),g=o.cache(),x=/#.*$/,w=/^[^#]*#?!?/,b="params",y=h.nativeHistory,C=function(e,t,n){if(e){n=this[b],o.isArray(e)||(e=e.split(","));for(var r=0;e.length>r&&!(t=v(n,e[r]));r++);}return t},E=function(){return v(this,u)},V=function(){return v(this,"view")},M=function(){var e=this,t=e.hash,n=e.query;return t[u]!=n[u]},j=function(e){var t=this,n=t.hash,r=t.query;return n[b][e]!=r[b][e]},I=function(e){var t=this,n=t.hash;return v(n[b],e)},T=function(e){var t=this,n=t.query;return v(n[b],e)},k=function(e){var t=this,n=t[b];return n[e]},O=function(e){var t=o.pathToObject(e,d),n=t[u];return n&&a&&(t[u]=o.path(s.location[u],n)),t},H=p({getView:function(e){if(!r){r={rs:h.routes||{},nf:h.notFoundView};var t=h.defaultView;if(!t)throw Error("unset defaultView");r.home=t;var n=h.defaultPathname||f;r.rs[n]=t,r[u]=n}var i;e||(e=r[u]);var a=r.rs;return i=o.isFunction(a)?a.call(h,e):a[e],{view:i?i:r.nf||r.home,pathname:i||y?e:r.nf?e:r[u]}},start:function(){var e=H,t=s.history;i=y&&t.pushState,a=y&&!i,i?e.useState():e.useHash(),e.route()},parseQH:function(e){e=e||s.location.href;var t=H,n=m.get(e);if(!n){var r=e.replace(x,f),i=e.replace(w,f),a=O(r),o=O(i),c={};p(c,a[b]),p(c,o[b]),n={pathnameDiff:M,paramDiff:j,hashOwn:I,queryOwn:T,get:k,href:e,srcQuery:r,srcHash:i,query:a,hash:o,params:c},m.set(e,n)}if(!n.view){var v;v=y?n.hash[u]||n.query[u]:n.hash[u];var l=t.getView(v);p(n,l)}return n},getChged:function(e,t){var n=e.href,r=t.href,i=n+"\n"+r,a=g.get(i);if(a||(i=r+"\n"+i,a=g.get(i)),!a){var o;a={params:{}},e[u]!=t[u]&&(a[u]=1,o=1),e.view!=t.view&&(a.view=1,o=1);var c,s=e[b],f=t[b];for(c in s)s[c]!=f[c]&&(o=1,a[b][c]=1);for(c in f)s[c]!=f[c]&&(o=1,a[b][c]=1);a.occur=o,a.isParam=C,a.isPathname=E,a.isView=V,g.set(i,a)}return a},route:function(){var e=H,r=e.parseQH(),i=n||{params:{},href:"~"},a=!n;n=r;var o=e.getChged(i,r);o.occur&&(t=r,e.fire("changed",{location:r,changed:o,force:a}))},navigate:function(e,n,r){var c=H;if(!n&&o.isObject(e)&&(n=e,e=f),n&&(e=o.objectToPath({params:n,pathname:e},d)),e){var s=O(e),l={};if(l[b]=p({},s[b]),l[u]=s[u],l[u]){if(a){var h=t.query;if(h&&(h=h[b]))for(var m in h)v(h,m)&&!v(l[b],m)&&(l[b][m]=f)}}else{var g=p({},t[b]);l[b]=p(g,l[b]),l[u]=t[u]}var x,w=o.objectToPath(l);x=i?w!=t.srcQuery:w!=t.srcHash,x&&(i?(c.poped=1,history[r?"replaceState":"pushState"](null,null,w),c.route()):(p(l,t,l),l.srcHash=w,l.hash={params:l[b],pathname:l[u]},c.fire("!ul",{loc:t=l}),w="#!"+w,r?location.replace(w):location.hash=w))}}},c);return H.useState=function(){var e=H,t=location.href;$(s).on("popstate",function(){var n=location.href==t;(e.poped||!n)&&(e.poped=1,e.route())},!1)},H.useHash=function(){$(s).on("hashchange",H.route,!1)},H}),define("magix/body",["magix/magix"],function(e){var t=e("magix/magix"),n=t.has;t.mix;var r,i=t.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),a=document.body,o={},c="mx-owner",s="mx-ie",f={},u=65536,v=function(e){return e.id||(e.id="mx-e-"+u--)},p=function(e,t,n){return n?e.setAttribute(t,n):n=e.getAttribute(t),n},l={process:function(e){for(var t=e.target||e.srcElement;t&&1!=t.nodeType;)t=t.parentNode;var i=t,o=e.type,u=f[o]||(f[o]=RegExp("(?:^|,)"+o+"(?:,|$)"));if(!u.test(p(t,s))){for(var l,d,h="mx-"+o,m=[];i&&i!=a&&(l=p(i,h),d=p(i,s),!l&&!u.test(d));)m.push(i),i=i.parentNode;if(l){var g=p(i,c);if(!g)for(var x=i,w=r.all();x&&x!=a;){if(n(w,x.id)){p(i,c,g=x.id);break}x=x.parentNode}if(!g)throw Error("miss "+c+":"+l);var b=r.get(g),y=b&&b.view;y&&y.processEvent({info:l,se:e,tId:v(t),cId:v(i)})}else for(var C,d;m.length;)C=m.shift(),d=p(C,s),u.test(d)||(d=d?d+","+o:o,p(C,s,d))}},on:function(e,t){var n=this;if(o[e])o[e]++;else{r=t,o[e]=1;var c=i[e];c?n.unbubble(0,a,e):a["on"+e]=function(e){e=e||window.event,e&&n.process(e)}}},un:function(e){var t=this,n=o[e];if(n>0){if(n--,!n){var r=i[e];r?t.unbubble(1,a,e):a["on"+e]=null}o[e]=n}}};return l.unbubble=function(e,t,n){var r=e?"undelegate":"delegate";$(t)[r]("[mx-"+n+"]",n,l.process)},l}),define("magix/event",["magix/magix"],function(e){var t=e("magix/magix"),n=function(e){return"~"+e},r=t.safeExec,i={fire:function(e,t,i,a){var o=n(e),c=this,s=c[o];if(s){t||(t={}),t.type||(t.type=e);for(var f,u,v=s.length,p=v-1;v--;)f=a?v:p-v,u=s[f],(u.d||u.r)&&(s.splice(f,1),p--),u.d||r(u.f,t,c)}i&&delete c[o]},on:function(e,r,i){var a=n(e),o=this[a]||(this[a]=[]);t.isNumeric(i)?o.splice(i,0,{f:r}):o.push({f:r,r:i})},un:function(e,t){var r=n(e),i=this[r];if(i)if(t){for(var a,o=i.length-1;o>=0;o--)if(a=i[o],a.f==t&&!a.d){a.d=1;break}}else delete this[r]}};return i}),define("magix/vframe",["magix/magix","magix/event","magix/view"],function(e){var t,n,r,i=e("magix/magix"),a=e("magix/event"),o=e("magix/view"),c=document,s=65536,f=window,u=i.safeExec,v=[].slice,p=f.CollectGarbage||i.noop,l=i.mix,d=i.config("tagName"),h=i.config("rootId"),m=!i.config("tagNameChanged"),g=i.has,x="mx-view",w=m?"mx-defer":"mx-vframe",b="alter",y="created",C=function(e){return"object"==typeof e?e:c.getElementById(e)},E=function(e,t){return C(e).getElementsByTagName(t)},V=function(e){return c.createElement(e)},M=function(e){return e.id||(e.id="magix_vf_"+s--)},j=/<script[^>]*>[\s\S]*?<\/script>/gi,I=function(e){var t=this;t.id=e,t.cM={},t.cC=0,t.rC=0,t.sign=1<<30,t.rM={}};return l(I,{root:function(e,n){if(!t){r=n;var i=C(h);i||(i=V(d),i.id=h,c.body.insertBefore(i,c.body.firstChild)),t=new I(h),e.add(t)}return t}}),l(l(I.prototype,a),{mountView:function(e,t,n){var a=this,c=C(a.id);if(c._bak?c._chgd=1:(c._bak=1,c._tmpl=c.innerHTML.replace(j,"")),a.unmountView(),e){var s=i.pathToObject(e),f=s.pathname,v=--a.sign;i.libRequire(f,function(e){if(v==a.sign){var i=a.owner;o.prepare(e);var p=new e({owner:a,id:a.id,$:C,path:f,vom:i,location:r});a.view=p,p.on("interact",function(e){e.tmpl||(c._chgd&&(c.innerHTML=c._tmpl),a.mountZoneVframes(0,0,1)),p.on("rendered",function(){a.mountZoneVframes(0,0,1)}),p.on("prerender",function(){a.unmountZoneVframes()||a.cAlter({caused:a.id})}),p.on("inited",function(){a.viewInited=1,a.fire("viewInited",{view:p}),n&&u(n,p,a)})},0),t=t||{},p.load(l(t,s.params,t))}})}},unmountView:function(){var e=this;if(e.view){n||(n={caused:e.id}),e.unmountZoneVframes(),e.cAlter(n),e.view.destroy();var t=C(e.id);t&&t._bak&&(t.innerHTML=t._tmpl),delete e.view,delete e.viewInited,n=0,e.fire("viewUnmounted"),p()}e.sign--},mountVframe:function(e,t,n,r){var i=this,a=i.owner,o=a.get(e);return o||(o=new I(e),o.pId=i.id,g(i.cM,e)||i.cC++,i.cM[e]=r,a.add(o)),o.mountView(t,n),o},mountZoneVframes:function(e,t,n){var r=this,i=e||r.id;r.unmountZoneVframes(i);var a=E(i,d),o=a.length,c={};if(o)for(var s,f,u,v,p=0;o>p;p++)if(s=a[p],f=M(s),!g(c,f)&&(u=s.getAttribute(x),v=!s.getAttribute(w)==m,v||u)){r.mountVframe(f,u,t,n);for(var l,h=E(s,d),b=0,y=h.length;y>b;b++)l=h[b],u=l.getAttribute(x),v=!s.getAttribute(w)==m,v||u||(c[M(l)]=1)}r.cC==r.rC&&r.cCreated({})},unmountVframe:function(e){var t=this;e=e||t.id;var n=t.owner,r=n.get(e);if(r){var i=r.fcc;r.unmountView(),n.remove(e,i),t.fire("destroy");var a=n.get(r.pId);a&&g(a.cM,e)&&(delete a.cM[e],a.cC--)}},unmountZoneVframes:function(e){var t,n,r=this;if(e){t=E(e,d);for(var i,a={},o=r.cM,c=t.length-1;c>=0;c--)i=t[c].id,g(o,i)&&(a[i]=1);t=a}else t=r.cM;for(var s in t)n=!0,r.unmountVframe(s);return n},invokeView:function(e){var t,n=this,r=n.view,i=v.call(arguments,1);return n.viewInited&&r[e]&&(t=u(r[e],i,r)),t},cCreated:function(e){var t=this,n=t.view;n&&!t.fcc&&(t.fcc=1,delete t.fca,n.fire(y,e),t.fire(y,e));var r=t.owner;r.vfCreated();var i=t.id,a=r.get(t.pId);a&&!g(a.rM,i)&&(a.rM[i]=a.cM[i],a.rC++,a.rC==a.cC&&a.cCreated(e))},cAlter:function(e){var t=this;if(delete t.fcc,!t.fca){var n=t.view,r=t.id;n&&(t.fca=1,n.fire(b,e),t.fire(b,e));var i=t.owner,a=i.get(t.pId);if(a&&g(a.rM,r)){var o=a.rM[r];a.rC--,delete a.rM[r],o&&a.cAlter(e)}}},locChged:function(e,t){var n=this,r=n.view;if(r&&r.sign&&r.rendered){var a=r.olChanged(t),o={location:e,changed:t,prevent:function(){this.cs=[]},toChildren:function(e){e=e||[],i.isString(e)&&(e=e.split(",")),this.cs=e}};a&&u(r.locationChange,o,r);for(var c,s=o.cs||i.keys(n.cM),f=0,v=s.length,p=n.owner;v>f;f++)c=p.get(s[f]),c&&c.locChged(e,t)}}}),I}),define("magix/view",["magix/magix","magix/event","magix/body"],function(e){var t=e("magix/magix"),n=e("magix/event"),r=e("magix/body"),i=t.safeExec,a=t.has,o=",",c=[],s=t.mix,f=["render","renderUI"],u="~",v=function(e){return function(){var t,n=this,r=n.notifyUpdate();return r&&(t=e.apply(n,arguments)),t}},p=t.cache(40),l=function(e){var t=this;s(t,e),t.sign=1};s(l,{wrapUpdate:function(){var e=this;if(!e[u]){e[u]=1;for(var n,r,i=e.prototype,a=f.length-1;a>-1;a--)r=f[a],n=i[r],t.isFunction(n)&&n!=t.noop&&(i[r]=v(n))}}});var d=l.prototype,h=window.CollectGarbage||t.noop,m=/<[a-z]+(?:[^">]|"[^"]*")+(?=>)/g,g=/\smx-owner\s*=/,x=/\smx-[^v][a-z]+\s*=/,w=function(e){return!g.test(e)&&x.test(e)?e+' mx-owner="'+w.t+'"':e},b={prevent:function(e){e=e||this.domEvent,e.preventDefault?e.preventDefault():e.returnValue=!1},stop:function(e){e=e||this.domEvent,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},halt:function(e){this.prevent(e),this.stop(e)}},y=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,C=/(\w+):([^,]+)/g;s(d,n),s(d,{render:t.noop,locationChange:t.noop,init:t.noop,hasTmpl:!0,enableEvent:!0,load:function(){var e=this,t=e.hasTmpl,n=arguments,r=e.sign,o=a(e,"template"),s=function(a){if(r==e.sign){o||(e.template=e.wrapMxEvent(a)),e.delegateEvents(),e.fire("interact",{tmpl:t},1),i(e.init,n,e),e.fire("inited",0,1),i(e.render,c,e);var s=!t&&!e.rendered;s&&(e.rendered=!0,e.fire("primed",null,1))}};t&&!o?e.fetchTmpl(s):s()},beginUpdate:function(){var e=this;e.sign&&e.rendered&&(e.fire("refresh",0,1),e.fire("prerender"))},endUpdate:function(){var e=this;e.sign&&(e.rendered||e.fire("primed",0,1),e.rendered=!0,e.fire("rendered"),h())},notifyUpdate:function(){var e=this;return e.sign&&(e.sign++,e.fire("rendercall")),e.sign},wrapMxEvent:function(e){return w.t=this.id,(e+"").replace(m,w)},setViewHTML:function(e){var t,n=this;n.beginUpdate(),n.sign&&(t=n.$(n.id),t&&(t.innerHTML=e)),n.endUpdate()},observeLocation:function(e){var n,r=this;r.$ol||(r.$ol={keys:[]}),n=r.$ol;var i=n.keys;t.isObject(e)&&(n.pn=e.pathname,e=e.keys),e&&(n.keys=i.concat((e+"").split(o)))},olChanged:function(e){var t=this,n=t.$ol;if(n){var r=0;if(n.pn&&(r=e.isPathname()),!r){var i=n.keys;r=e.isParam(i)}return r}return 1},destroy:function(){var e=this;e.fire("refresh",0,1),e.fire("destroy",0,1,1),e.delegateEvents(1),e.sign=0},parentView:function(){var e=this,t=e.vom,n=e.owner,r=t.get(n.pId),i=null;return r&&r.viewInited&&(i=r.view),i},processEvent:function(e){var t=this;if(t.enableEvent&&t.sign){var n=e.info,r=e.se,a=p.get(n);a||(a=n.match(y),a={n:a[1],f:a[2],i:a[3],p:{}},a.i&&a.i.replace(C,function(e,t,n){a.p[t]=n}),p.set(n,a));var o=t.events;if(o){var c=o[r.type],f=b[a.f];f&&f.call(b,r),f=c&&c[a.n],f&&i(f,s({view:t,currentId:e.cId,targetId:e.tId,domEvent:r,events:o,params:a.p},b),c)}}},delegateEvents:function(e){var t=this,n=t.events,i=e?r.un:r.on,a=t.vom;for(var o in n)i.call(r,o,a)}});var E=t.config("appHome"),V=t.config("debug")?"?t="+Date.now():"",M=function(e,n,r){for(var i in n)t.isObject(n[i])?(a(e,i)||(e[i]={}),M(e[i],n[i],1)):r&&(e[i]=n[i])};return l.prototype.fetchTmpl=function(e){var n=this,r="template"in n;if(r)e(tmpl);else{var a=t.tmpl(n.path);if(a.h)e(a.v);else{var o=E+n.path+".html",c=M[o],s=function(r){e(t.tmpl(n.path,r))};c?c.push(s):(c=M[o]=[s],$.ajax({url:o+V,success:function(e){i(c,e),delete M[o]},error:function(e,t){i(c,t),delete M[o]}}))}}},l.extend=function(e,n,r){var a=this,o=function(){o.superclass.constructor.apply(this,arguments),n&&i(n,arguments,this)};return o.extend=a.extend,t.extend(o,a,e,r)},l.prepare=function(e){var t=this;if(!e.wrapUpdate){e.wrapUpdate=t.wrapUpdate,e.extend=t.extend;for(var n,r=e.prototype,i=e.superclass;i;)n=i.constructor,M(r,n.prototype),i=n.superclass}e.wrapUpdate()},l}),define("magix/vom",["magix/vframe","magix/magix","magix/event"],function(e){var t=e("magix/vframe"),n=e("magix/magix"),r=e("magix/event"),i=n.has,a=n.mix,o=0,c=0,s=0,f=0,u={},v={},p=n.mix({all:function(){return u},add:function(e){i(u,e.id)||(o++,u[e.id]=e,e.owner=p,p.fire("add",{vframe:e}))},get:function(e){return u[e]},remove:function(e,t){var n=u[e];n&&(o--,t&&c--,delete u[e],p.fire("remove",{vframe:n}))},vfCreated:function(){if(!f){c++;var e=c/o;e>s&&p.fire("progress",{percent:s=e},f=1==e)}},root:function(){return t.root(p,v)},locChged:function(e){var t,n=e.loc;if(n?t=1:n=e.location,a(v,n),!t){var r=p.root(),i=e.changed;i.isView()?r.mountView(n.view):r.locChged(n,i)}}},r);return p}),function(e){document.createElement("vframe");var t=function(){};e.console||(e.console={log:t,info:t,warn:t});var n,r={};e.Magix||(e.Magix={config:function(e){for(var t in e)r[t]=e[t]},start:function(e){n=e}},seajs.use("magix/magix",function(t){e.Magix=t,t.config(r),n&&t.start(n)}))}(this);
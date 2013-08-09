define("magix/magix",function(){[].slice;var e=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,t=/\/[^\/]*$/,n=/[#?].*$/,r="",i=/([^=&?\/#]+)=([^&=#?]*)/g,a="pathname",o=/^https?:\/\//i,c={},f=0,s="/",u="vframe",v={iniFile:"app/ini",appName:"app",appHome:"./",tagName:u,rootId:"magix_vf_root"},p=c.hasOwnProperty,l=function(e){return function(t,n,r){switch(arguments.length){case 0:r=e;break;case 1:r=C.isObject(t)?g(e,t):m(e,t)?e[t]:null;break;case 2:null===n?(delete e[t],r=n):e[t]=r=n}return r}},d=function(e){var t=this;t.c=[],t.x=e||5,t.b=t.x+3},h=function(e){return new d(e)},m=function(e,t){return e?p.call(e,t):0},g=function(e,t,n){for(var r in t)n&&m(n,r)||(e[r]=t[r]);return e};g(d.prototype,{get:function(e){var t,n=this,r=n.c;return e=a+e,m(r,e)&&(t=r[e],t.f>=1&&(t.f++,t.t=f++,t=t.v)),t},set:function(e,t){var n=this,r=n.c;e=a+e;var i=r[e];if(!m(r,e)){if(r.length>=n.b){r.sort(function(e,t){return t.f==e.f?t.t-e.t:t.f-e.f});for(var o=n.b-n.x;o--;)i=r.pop(),delete r[i.k]}i={},r.push(i),r[e]=i}return i.k=e,i.v=t,i.f=1,i.t=f++,i},del:function(e){e=a+e;var t=this.c,n=t[e];n&&(n.f=-1e5,n.v=r,delete t[e])},has:function(e){return e=a+e,m(this.c,e)}});var x=h(20),w=h(),b=function(e,t,n,r,i,a){for(C.isArray(e)||(e=[e]),t&&(C.isArray(t)||t.callee)||(t=[t]),r=0;e.length>r;r++)try{a=e[r],i=C.isFunction(a)&&a.apply(n,t)}catch(o){}return i},y=function(){},C={isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},mix:g,has:m,safeExec:b,noop:y,config:l(v),start:function(e){var t=this;e=g(v,e),t.libEnv(e),e.ready&&(b(e.ready),delete e.ready),t.libRequire(e.iniFile,function(n){v=g(e,n,e),v.tagNameChanged=v.tagName!=u;var r=e.progress;t.libRequire(["magix/router","magix/vom"],function(n,i){n.on("!ul",i.locChged),n.on("changed",i.locChged),r&&i.on("progress",r),t.libRequire(e.extensions,n.start)})})},keys:Object.keys||function(e){var t=[];for(var n in e)m(e,n)&&t.push(n);return t},local:l({}),path:function(i,a){var c=i+"\n"+a,f=w.get(c);if(!f){if(o.test(a))f=a;else if(i=i.replace(n,r).replace(t,r)+s,a.charAt(0)==s){var u=o.test(i)?8:0,v=i.indexOf(s,u);f=i.substring(0,v)+a}else f=i+a;for(;e.test(f);)f=f.replace(e,"$1/");w.set(c,f)}return f},pathToObject:function(e,t){var c=x.get(e);if(!c){var c={},f={},u=r;if(n.test(e)?u=e.replace(n,r):~e.indexOf("=")||(u=e),u&&o.test(u)){var v=u.indexOf(s,8);u=-1==v?s:u.substring(v)}e.replace(i,function(e,n,r){if(t)try{r=decodeURIComponent(r)}catch(i){}f[n]=r}),c[a]=u,c.params=f,x.set(e,c)}return c},objectToPath:function(e,t){var n,r=e[a],i=[],o=e.params;for(var c in o)n=o[c],t&&encodeURIComponent(n),i.push(c+"="+n);return i.length&&(r=r+"?"+i.join("&")),r},tmpl:function(e,t){return 1==arguments.length?{v:c[e],h:m(c,e)}:c[e]=t},listToMap:function(e,t){var n,r,i,a={};if(C.isString(e)&&(e=e.split(",")),e&&(i=e.length))for(n=0;i>n;n++)r=e[n],a[t?r[t]:r]=t?r:1;return a},cache:h},E=Object.prototype.toString;return g(C,{libRequire:function(e,t){C.isArray(e)||(e=[e]),e?require(e,t):t&&t()},libEnv:function(e){var t=this,n=e.appHome,i=location;i.protocol;var a=e.appName;n=t.path(i.href,n+s),e.appHome=n;var o=e.debug;o&&(o=0==n.indexOf(i.protocol+s+s+i.host+s));var c=r;c=o?Date.now():e.appTag,c&&(c+=".js");var f={};f[a]=n+a+"/",requirejs.config({paths:f})},isArray:$.isArray,isFunction:$.isFunction,isObject:function(e){return"[object Object]"==E.call(e)},isString:function(e){return"[object String]"==E.call(e)},isNumber:function(e){return"[object Number]"==E.call(e)},isRegExp:function(e){return"[object RegExp]"==E.call(e)},extend:function(e,t,n,r){e.superclass=t.prototype;var i=function(){};return i.prototype=t.prototype,e.prototype=new i,C.mix(e.prototype,n),C.mix(e,r),e.prototype.constructor=e,e}})}),define("magix/router",["magix/magix","magix/event"],function(e,t){var n,r,i,a,o,c=window,f="",s="pathname",u=e.has,v=e.mix,p=document,l=/^UTF-8$/i.test(p.charset||p.characterSet||"UTF-8"),d=e.config(),h=e.cache(),m=e.cache(),g=/#.*$/,x=/^[^#]*#?!?/,w="params",b=d.nativeHistory,y=function(t,n,r){if(t){r=this[w],e.isArray(t)||(t=t.split(","));for(var i=0;t.length>i&&!(n=u(r,t[i]));i++);}return n},C=function(){return u(this,s)},E=function(){return u(this,"view")},M=function(){var e=this,t=e.hash,n=e.query;return t[s]!=n[s]},V=function(e){var t=this,n=t.hash,r=t.query;return n[w][e]!=r[w][e]},j=function(e){var t=this,n=t.hash;return u(n[w],e)},T=function(e){var t=this,n=t.query;return u(n[w],e)},I=function(e){var t=this,n=t[w];return n[e]},k=function(t){var n=e.pathToObject(t,l),r=n[s];return r&&o&&(n[s]=e.path(c.location[s],r)),n},O=v({getView:function(t){if(!i){i={rs:d.routes||{},nf:d.notFoundView};var n=d.defaultView;if(!n)throw Error("unset defaultView");i.home=n;var r=d.defaultPathname||f;i.rs[r]=n,i[s]=r}var a;t||(t=i[s]);var o=i.rs;return a=e.isFunction(o)?o.call(d,t):o[t],{view:a?a:i.nf||i.home,pathname:a||b?t:i.nf?t:i[s]}},start:function(){var e=O,t=c.history;a=b&&t.pushState,o=b&&!a,a?e.useState():e.useHash(),e.route()},parseQH:function(e){e=e||c.location.href;var t=O,n=h.get(e);if(!n){var r=e.replace(g,f),i=e.replace(x,f),a=k(r),o=k(i),u={};v(u,a[w]),v(u,o[w]),n={pathnameDiff:M,paramDiff:V,hashOwn:j,queryOwn:T,get:I,href:e,srcQuery:r,srcHash:i,query:a,hash:o,params:u},h.set(e,n)}if(!n.view){var p;p=b?n.hash[s]||n.query[s]:n.hash[s];var l=t.getView(p);v(n,l)}return n},getChged:function(e,t){var n=e.href,r=t.href,i=n+"\n"+r,a=m.get(i);if(a||(i=r+"\n"+i,a=m.get(i)),!a){var o;a={params:{}},e[s]!=t[s]&&(a[s]=1,o=1),e.view!=t.view&&(a.view=1,o=1);var c,f=e[w],u=t[w];for(c in f)f[c]!=u[c]&&(o=1,a[w][c]=1);for(c in u)f[c]!=u[c]&&(o=1,a[w][c]=1);a.occur=o,a.isParam=y,a.isPathname=C,a.isView=E,m.set(i,a)}return a},route:function(){var e=O,t=e.parseQH(),i=r||{params:{},href:"~"},a=!r;r=t;var o=e.getChged(i,t);o.occur&&(n=t,e.fire("changed",{location:t,changed:o,force:a}))},navigate:function(t,r,i){var c=O;if(!r&&e.isObject(t)&&(r=t,t=f),r&&(t=e.objectToPath({params:r,pathname:t},l)),t){var p=k(t),d={};if(d[w]=v({},p[w]),d[s]=p[s],d[s]){if(o){var h=n.query;if(h&&(h=h[w]))for(var m in h)u(h,m)&&!u(d[w],m)&&(d[w][m]=f)}}else{var g=v({},n[w]);d[w]=v(g,d[w]),d[s]=n[s]}var x,b=e.objectToPath(d);x=a?b!=n.srcQuery:b!=n.srcHash,x&&(a?(c.poped=1,history[i?"replaceState":"pushState"](null,null,b),c.route()):(v(d,n,d),d.srcHash=b,d.hash={params:d[w],pathname:d[s]},c.fire("!ul",{loc:n=d}),b="#!"+b,i?location.replace(b):location.hash=b))}}},t);return O.useState=function(){var e=O,t=location.href;$(c).on("popstate",function(){var n=location.href==t;(e.poped||!n)&&(e.poped=1,e.route())},!1)},O.useHash=function(){$(c).on("hashchange",O.route,!1)},O}),define("magix/body",["magix/magix"],function(e){var t=e.has;e.mix;var n,r=e.listToMap(""),i=document.body,a={},o="mx-owner",c="mx-ie",f={},s=65536,u=function(e){return e.id||(e.id="mx-e-"+s--)},v=function(e,t,n){return n?e.setAttribute(t,n):n=e.getAttribute(t),n},p={process:function(e){for(var r=e.target||e.srcElement;r&&1!=r.nodeType;)r=r.parentNode;var a=r,s=e.type,p=f[s]||(f[s]=RegExp("(?:^|,)"+s+"(?:,|$)"));if(!p.test(v(r,c))){for(var l,d,h="mx-"+s,m=[];a&&a!=i&&(l=v(a,h),d=v(a,c),!l&&!p.test(d));)m.push(a),a=a.parentNode;if(l){var g=v(a,o);if(!g)for(var x=a,w=n.all();x&&x!=i;){if(t(w,x.id)){v(a,o,g=x.id);break}x=x.parentNode}if(!g)throw Error("miss "+o+":"+l);var b=n.get(g),y=b&&b.view;y&&y.processEvent({info:l,se:e,tId:u(r),cId:u(a)})}else for(var C,d;m.length;)C=m.shift(),d=v(C,c),p.test(d)||(d=d?d+","+s:s,v(C,c,d))}},on:function(e,t){var o=this;if(a[e])a[e]++;else{n=t,a[e]=1;var c=r[e];c?o.unbubble(0,i,e):i["on"+e]=function(e){e=e||window.event,e&&o.process(e)}}},un:function(e){var t=this,n=a[e];if(n>0){if(n--,!n){var o=r[e];o?t.unbubble(1,i,e):i["on"+e]=null}a[e]=n}}};return p.unbubble=function(e,t,n){var r=e?"undelegate":"delegate";$(t)[r]("[mx-"+n+"]",n,p.process)},p}),define("magix/event",["magix/magix"],function(e){var t=function(e){return"~"+e},n=e.safeExec,r={fire:function(e,r,i,a){var o=t(e),c=this,f=c[o];if(f){r||(r={}),r.type||(r.type=e);for(var s,u,v=f.length,p=v-1;v--;)s=a?v:p-v,u=f[s],(u.d||u.r)&&(f.splice(s,1),p--),u.d||n(u.f,r,c)}i&&delete c[o]},on:function(n,r,i){var a=t(n),o=this[a]||(this[a]=[]);e.isNumeric(i)?o.splice(i,0,{f:r}):o.push({f:r,r:i})},un:function(e,n){var r=t(e),i=this[r];if(i)if(n){for(var a,o=i.length-1;o>=0;o--)if(a=i[o],a.f==n&&!a.d){a.d=1;break}}else delete this[r]}};return r}),define("magix/vframe",["magix/magix","magix/event","magix/view"],function(e,t,n){var r,i,a,o=document,c=65536,f=e.safeExec,s=[].slice,u=e.mix,v=e.config("tagName"),p=e.config("rootId"),l=!e.config("tagNameChanged"),d=e.has,h="mx-view",m=l?"mx-defer":"mx-vframe",g="alter",x="created",w=function(e){return"object"==typeof e?e:o.getElementById(e)},b=function(e,t){return w(e).getElementsByTagName(t)},y=function(e){return o.createElement(e)},C=function(e){return e.id||(e.id="magix_vf_"+c--)},E=/<script[^>]*>[\s\S]*?<\/script>/gi,M=function(e){var t=this;t.id=e,t.cM={},t.cC=0,t.rC=0,t.sign=1<<30,t.rM={}};return u(M,{root:function(e,t){if(!r){a=t;var n=w(p);n||(n=y(v),n.id=p,o.body.insertBefore(n,o.body.firstChild)),r=new M(p),e.add(r)}return r}}),u(u(M.prototype,t),{mountView:function(t,r,i){var o=this,c=w(o.id);if(c._bak?c._chgd=1:(c._bak=1,c._tmpl=c.innerHTML.replace(E,"")),o.unmountView(),t){var s=e.pathToObject(t),v=s.pathname,p=--o.sign;e.libRequire(v,function(e){if(p==o.sign){var t=o.owner;n.prepare(e);var l=new e({owner:o,id:o.id,$:w,path:v,vom:t,location:a});o.view=l,l.on("interact",function(e){e.tmpl||(c._chgd&&(c.innerHTML=c._tmpl),o.mountZoneVframes(0,0,1)),l.on("rendered",function(){o.mountZoneVframes(0,0,1)}),l.on("prerender",function(){o.unmountZoneVframes()||o.cAlter({caused:o.id})}),l.on("inited",function(){o.viewInited=1,o.fire("viewInited",{view:l}),i&&f(i,l,o)})},0),r=r||{},l.load(u(r,s.params,r))}})}},unmountView:function(){var e=this;if(e.view){i||(i={caused:e.id}),e.unmountZoneVframes(),e.cAlter(i),e.view.destroy();var t=w(e.id);t&&t._bak&&(t.innerHTML=t._tmpl),delete e.view,delete e.viewInited,i=0,e.fire("viewUnmounted")}e.sign--},mountVframe:function(e,t,n,r){var i=this,a=i.owner,o=a.get(e);return o||(o=new M(e),o.pId=i.id,d(i.cM,e)||i.cC++,i.cM[e]=r,a.add(o)),o.mountView(t,n),o},mountZoneVframes:function(e,t,n){var r=this,i=e||r.id;r.unmountZoneVframes(i);var a=b(i,v),o=a.length,c={};if(o)for(var f,s,u,p,g=0;o>g;g++)if(f=a[g],s=C(f),!d(c,s)&&(u=f.getAttribute(h),p=!f.getAttribute(m)==l,p||u)){r.mountVframe(s,u,t,n);for(var x,w=b(f,v),y=0,E=w.length;E>y;y++)x=w[y],u=x.getAttribute(h),p=!f.getAttribute(m)==l,p||u||(c[C(x)]=1)}r.cC==r.rC&&r.cCreated({})},unmountVframe:function(e){var t=this;e=e||t.id;var n=t.owner,r=n.get(e);if(r){var i=r.fcc;r.unmountView(),n.remove(e,i),t.fire("destroy");var a=n.get(r.pId);a&&d(a.cM,e)&&(delete a.cM[e],a.cC--)}},unmountZoneVframes:function(e){var t,n,r=this;if(e){t=b(e,v);for(var i,a={},o=r.cM,c=t.length-1;c>=0;c--)i=t[c].id,d(o,i)&&(a[i]=1);t=a}else t=r.cM;for(var f in t)n=1,r.unmountVframe(f);return n},invokeView:function(e){var t,n=this,r=n.view,i=s.call(arguments,1);return n.viewInited&&r[e]&&(t=f(r[e],i,r)),t},cCreated:function(e){var t=this,n=t.view;n&&!t.fcc&&(t.fcc=1,delete t.fca,n.fire(x,e),t.fire(x,e));var r=t.owner;r.vfCreated();var i=t.id,a=r.get(t.pId);a&&!d(a.rM,i)&&(a.rM[i]=a.cM[i],a.rC++,a.rC==a.cC&&a.cCreated(e))},cAlter:function(e){var t=this;if(delete t.fcc,!t.fca){var n=t.view,r=t.id;n&&(t.fca=1,n.fire(g,e),t.fire(g,e));var i=t.owner,a=i.get(t.pId);if(a&&d(a.rM,r)){var o=a.rM[r];a.rC--,delete a.rM[r],o&&a.cAlter(e)}}},locChged:function(t,n){var r=this,i=r.view;if(i&&i.sign&&i.rendered){var a=i.olChanged(n),o={location:t,changed:n,prevent:function(){this.cs=[]},toChildren:function(t){t=t||[],e.isString(t)&&(t=t.split(",")),this.cs=t}};a&&f(i.locationChange,o,i);for(var c,s=o.cs||e.keys(r.cM),u=0,v=s.length,p=r.owner;v>u;u++)c=p.get(s[u]),c&&c.locChged(t,n)}}}),M}),define("magix/view",["magix/magix","magix/event","magix/body"],function(e,t,n){var r=e.safeExec,i=e.has,a=",",o=[],c=e.mix,f=["render","renderUI"],s="~",u=function(e){return function(){var t,n=this,r=n.notifyUpdate();return r&&(t=e.apply(n,arguments)),t}},v=e.cache(40),p=function(e){var t=this;c(t,e),t.sign=1};c(p,{wrapUpdate:function(){var t=this;if(!t[s]){t[s]=1;for(var n,r,i=t.prototype,a=f.length-1;a>-1;a--)r=f[a],n=i[r],e.isFunction(n)&&n!=e.noop&&(i[r]=u(n))}}});var l=p.prototype,d=/<[a-z]+(?:[^">]|"[^"]*")+(?=>)/g,h=/\smx-owner\s*=/,m=/\smx-[^v][a-z]+\s*=/,g=function(e){return!h.test(e)&&m.test(e)?e+' mx-owner="'+g.t+'"':e},x={prevent:function(e){e=e||this.domEvent,e.preventDefault?e.preventDefault():e.returnValue=!1},stop:function(e){e=e||this.domEvent,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},halt:function(e){this.prevent(e),this.stop(e)}},w=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,b=/(\w+):([^,]+)/g;c(l,t),c(l,{render:e.noop,locationChange:e.noop,init:e.noop,hasTmpl:!0,enableEvent:!0,load:function(){var e=this,t=e.hasTmpl,n=arguments,a=e.sign,c=i(e,"template"),f=function(i){if(a==e.sign){c||(e.template=e.wrapMxEvent(i)),e.delegateEvents(),e.fire("interact",{tmpl:t},1),r(e.init,n,e),e.fire("inited",0,1),r(e.render,o,e);var f=!t&&!e.rendered;f&&(e.rendered=!0,e.fire("primed",null,1))}};t&&!c?e.fetchTmpl(f):f()},beginUpdate:function(){var e=this;e.sign&&e.rendered&&(e.fire("refresh",0,1),e.fire("prerender"))},endUpdate:function(){var e=this;e.sign&&(e.rendered||e.fire("primed",0,1),e.rendered=!0,e.fire("rendered"))},notifyUpdate:function(){var e=this;return e.sign&&(e.sign++,e.fire("rendercall")),e.sign},wrapMxEvent:function(e){return g.t=this.id,(e+"").replace(d,g)},setViewHTML:function(e){var t,n=this;n.beginUpdate(),n.sign&&(t=n.$(n.id),t&&(t.innerHTML=e)),n.endUpdate()},observeLocation:function(t){var n,r=this;r.$ol||(r.$ol={keys:[]}),n=r.$ol;var i=n.keys;e.isObject(t)&&(n.pn=t.pathname,t=t.keys),t&&(n.keys=i.concat((t+"").split(a)))},olChanged:function(e){var t=this,n=t.$ol;if(n){var r=0;if(n.pn&&(r=e.isPathname()),!r){var i=n.keys;r=e.isParam(i)}return r}return 1},destroy:function(){var e=this;e.fire("refresh",0,1),e.fire("destroy",0,1,1),e.delegateEvents(1),e.sign=0},processEvent:function(e){var t=this;if(t.enableEvent&&t.sign){var n=e.info,i=e.se,a=v.get(n);a||(a=n.match(w),a={n:a[1],f:a[2],i:a[3],p:{}},a.i&&a.i.replace(b,function(e,t,n){a.p[t]=n}),v.set(n,a));var o=t.events;if(o){var f=o[i.type],s=x[a.f];s&&s.call(x,i),s=f&&f[a.n],s&&r(s,c({view:t,currentId:e.cId,targetId:e.tId,domEvent:i,events:o,params:a.p},x),f)}}},delegateEvents:function(e){var t=this,r=t.events,i=e?n.un:n.on,a=t.vom;for(var o in r)i.call(n,o,a)}});var y=e.config("appHome"),C=e.config("debug")?"?t="+Date.now():"",E=function(t,n,r){for(var a in n)e.isObject(n[a])?(i(t,a)||(t[a]={}),E(t[a],n[a],1)):r&&(t[a]=n[a])};return p.prototype.fetchTmpl=function(t){var n=this,i="template"in n;if(i)t(tmpl);else{var a=e.tmpl(n.path);if(a.h)t(a.v);else{var o=y+n.path+".html",c=E[o],f=function(r){t(e.tmpl(n.path,r))};c?c.push(f):(c=E[o]=[f],$.ajax({url:o+C,success:function(e){r(c,e),delete E[o]},error:function(e,t){r(c,t),delete E[o]}}))}}},p.extend=function(t,n,i){var a=this,o=function(){o.superclass.constructor.apply(this,arguments),n&&r(n,arguments,this)};return o.extend=a.extend,e.extend(o,a,t,i)},p.prepare=function(e){var t=this;if(!e.wrapUpdate){e.wrapUpdate=t.wrapUpdate,e.extend=t.extend;for(var n,r=e.prototype,i=e.superclass;i;)n=i.constructor,E(r,n.prototype),i=n.superclass}e.wrapUpdate()},p}),define("magix/vom",["magix/vframe","magix/magix","magix/event"],function(e,t,n){var r=t.has,i=t.mix,a=0,o=0,c=0,f=0,s={},u={},v=t.mix({all:function(){return s},add:function(e){r(s,e.id)||(a++,s[e.id]=e,e.owner=v,v.fire("add",{vframe:e}))},get:function(e){return s[e]},remove:function(e,t){var n=s[e];n&&(a--,t&&o--,delete s[e],v.fire("remove",{vframe:n}))},vfCreated:function(){if(!f){o++;var e=o/a;e>c&&v.fire("progress",{percent:c=e},f=1==e)}},root:function(){return e.root(v,u)},locChged:function(e){var t,n=e.loc;if(n?t=1:n=e.location,i(u,n),!t){var r=v.root(),a=e.changed;a.isView()?r.mountView(n.view):r.locChged(n,a)}}},n);return v}),function(e){document.createElement("vframe");var t=function(){};e.console||(e.console={log:t,info:t,warn:t});var n,r={};e.Magix||(e.Magix={config:function(e){for(var t in e)r[t]=e[t]},start:function(e){n=e}},require(["magix/magix"],function(t){e.Magix=t,t.config(r),n&&t.start(n)}))}(this);
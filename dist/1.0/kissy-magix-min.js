KISSY.add("magix/magix",function(e){var t=[].slice,n=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,r=/\/[^\/]*$/,i=/[#?].*$/,a="",o=/([^=&?\/#]+)=([^&=#?]*)/g,s="pathname",c=/^https?:\/\//i,u={},f=0,v="/",p="vframe",d={iniFile:"app/ini",appName:"app",appHome:"./",tagName:p,rootId:"magix_vf_root"},l=u.hasOwnProperty,h=function(e){return function(t,n,r){switch(arguments.length){case 0:r=e;break;case 1:r=E.isObject(t)?x(e,t):w(e,t)?e[t]:null;break;case 2:null===n?(delete e[t],r=n):e[t]=r=n}return r}},m=function(e){var t=this;t.c=[],t.x=e||20,t.b=t.x+5},g=function(e){return new m(e)},w=function(e,t){return e?l.call(e,t):0},x=function(e,t,n){for(var r in t)n&&w(n,r)||(e[r]=t[r]);return e};x(m.prototype,{get:function(e){var t,n=this,r=n.c;return e=s+e,w(r,e)&&(t=r[e],t.f>=1&&(t.f++,t.t=f++,t=t.v)),t},set:function(e,t){var n=this,r=n.c;e=s+e;var i=r[e];if(!w(r,e)){if(r.length>=n.b){r.sort(function(e,t){return t.f==e.f?t.t-e.t:t.f-e.f});for(var a=n.b-n.x;a--;)i=r.pop(),delete r[i.k]}i={},r.push(i),r[e]=i}return i.k=e,i.v=t,i.f=1,i.t=f++,i},del:function(e){e=s+e;var t=this.c,n=t[e];n&&(n.f=-1e5,n.v=a,delete t[e])},has:function(e){return e=s+e,w(this.c,e)}});var b=g(60),y=g(),C=function(e,t,n,r,i,a){for(E.isArray(e)||(e=[e]),t&&(E.isArray(t)||t.callee)||(t=[t]),r=0;e.length>r;r++)try{a=e[r],i=E.isFunction(a)&&a.apply(n,t)}catch(o){}return i},I=function(){},E={isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},mix:x,has:w,safeExec:C,noop:I,config:h(d),start:function(e){var t=this;e=x(d,e),t.libEnv(e),e.ready&&(C(e.ready),delete e.ready),t.libRequire(e.iniFile,function(n){d=x(e,n,e),d.tagNameChanged=d.tagName!=p;var r=e.progress;t.libRequire(["magix/router","magix/vom"],function(n,i){n.on("!ul",i.locChged),n.on("changed",i.locChged),r&&i.on("progress",r),t.libRequire(e.extensions,n.start)})})},keys:Object.keys||function(e){var t=[];for(var n in e)w(e,n)&&t.push(n);return t},local:h({}),path:function(e,t){var o=e+"\n"+t,s=y.get(o);if(!s){if(c.test(t))s=t;else if(e=e.replace(i,a).replace(r,a)+v,t.charAt(0)==v){var u=c.test(e)?8:0,f=e.indexOf(v,u);s=e.substring(0,f)+t}else s=e+t;for(;n.test(s);)s=s.replace(n,"$1/");y.set(o,s)}return s},pathToObject:function(e,t){var n=b.get(e);if(!n){var n={},r={},u=a;if(i.test(e)?u=e.replace(i,a):~e.indexOf("=")||(u=e),u&&c.test(u)){var f=u.indexOf(v,8);u=-1==f?v:u.substring(f)}e.replace(o,function(e,n,i){if(t)try{i=decodeURIComponent(i)}catch(a){}r[n]=i}),n[s]=u,n.params=r,b.set(e,n)}return n},objectToPath:function(e,t){var n,r=e[s],i=[],a=e.params;for(var o in a)n=a[o],t&&encodeURIComponent(n),i.push(o+"="+n);return i.length&&(r=r+"?"+i.join("&")),r},tmpl:function(e,t){return 1==arguments.length?{v:u[e],h:w(u,e)}:u[e]=t},listToMap:function(e,t){var n,r,i,a={};if(E.isString(e)&&(e=e.split(",")),e&&(i=e.length))for(n=0;i>n;n++)r=e[n],a[t?r[t]:r]=t?r:1;return a},cache:g};return x(E,{libRequire:function(n,r){n?e.use(n+"",function(e){r&&r.apply(e,t.call(arguments,1))}):r&&r()},libEnv:function(t){var n=this,r=t.appHome,i=location;i.protocol;var o=t.appName;r=n.path(i.href,r+v),t.appHome=r;var s=t.debug;s&&(s=0==r.indexOf(i.protocol+v+v+i.host+v));var c=a;c=s?e.now():t.appTag,c&&(c+=".js"),e.config({packages:[{name:o,path:r,debug:t.debug=s,combine:t.appCombine,tag:c}]})},isArray:e.isArray,isFunction:e.isFunction,isObject:e.isObject,isRegExp:e.isRegExp,isString:e.isString,isNumber:e.isNumber})}),KISSY.add("magix/router",function(e,t,n,r){var i,a,o,s,c,u=window,f="",v="pathname",p=t.has,d=t.mix,l=document,h=/^UTF-8$/i.test(l.charset||l.characterSet||"UTF-8"),m=t.config(),g=t.cache(),w=t.cache(),x=/#.*$/,b=/^[^#]*#?!?/,y="params",C=m.nativeHistory,I=function(e,n,r){if(e){r=this[y],t.isArray(e)||(e=e.split(","));for(var i=0;e.length>i&&!(n=p(r,e[i]));i++);}return n},E=function(){return p(this,v)},S=function(){return p(this,"view")},V=function(){var e=this,t=e.hash,n=e.query;return t[v]!=n[v]},M=function(e){var t=this,n=t.hash,r=t.query;return n[y][e]!=r[y][e]},T=function(e){var t=this,n=t.hash;return p(n[y],e)},k=function(e){var t=this,n=t.query;return p(n[y],e)},q=function(e){var t=this,n=t[y];return n[e]},j=function(e){var n=t.pathToObject(e,h),r=n[v];return r&&c&&(n[v]=t.path(u.location[v],r)),n},H=d({getView:function(e){if(!o){o={rs:m.routes||{},nf:m.notFoundView};var n=m.defaultView;if(!n)throw Error("unset defaultView");o.home=n;var r=m.defaultPathname||f;o.rs[r]=n,o[v]=r}var i;e||(e=o[v]);var a=o.rs;return i=t.isFunction(a)?a.call(m,e):a[e],{view:i?i:o.nf||o.home,pathname:i||C?e:o.nf?e:o[v]}},start:function(){var e=H,t=u.history;s=C&&t.pushState,c=C&&!s,s?e.useState():e.useHash(),e.route()},parseQH:function(e){e=e||u.location.href;var t=H,n=g.get(e);if(!n){var r=e.replace(x,f),i=e.replace(b,f),a=j(r),o=j(i),s={};d(s,a[y]),d(s,o[y]),n={pathnameDiff:V,paramDiff:M,hashOwn:T,queryOwn:k,get:q,href:e,srcQuery:r,srcHash:i,query:a,hash:o,params:s},g.set(e,n)}if(!n.view){var c;c=C?n.hash[v]||n.query[v]:n.hash[v];var p=t.getView(c);d(n,p)}return n},getChged:function(e,t){var n=e.href,r=t.href,i=n+"\n"+r,a=w.get(i);if(a||(i=r+"\n"+i,a=w.get(i)),!a){var o;a={params:{}},e[v]!=t[v]&&(a[v]=1,o=1),e.view!=t.view&&(a.view=1,o=1);var s,c=e[y],u=t[y];for(s in c)c[s]!=u[s]&&(o=1,a[y][s]=1);for(s in u)c[s]!=u[s]&&(o=1,a[y][s]=1);a.occur=o,a.isParam=I,a.isPathname=E,a.isView=S,w.set(i,a)}return a},route:function(){var e=H,t=e.parseQH(),n=a||{params:{},href:"~"},r=!a;a=t;var o=e.getChged(n,t);o.occur&&(i=t,e.fire("changed",{location:t,changed:o,force:r}))},navigate:function(e,n,r){var a=H;if(!n&&t.isObject(e)&&(n=e,e=f),n&&(e=t.objectToPath({params:n,pathname:e},h)),e){var o=j(e),u={};if(u[y]=d({},o[y]),u[v]=o[v],u[v]){if(c){var l=i.query;if(l&&(l=l[y]))for(var m in l)p(l,m)&&!p(u[y],m)&&(u[y][m]=f)}}else{var g=d({},i[y]);u[y]=d(g,u[y]),u[v]=i[v]}var w,x=t.objectToPath(u);w=s?x!=i.srcQuery:x!=i.srcHash,w&&(s?(a.poped=1,history[r?"replaceState":"pushState"](null,null,x),a.route()):(d(u,i,u),u.srcHash=x,u.hash={params:u[y],pathname:u[v]},a.fire("!ul",{loc:i=u}),x="#!"+x,r?location.replace(x):location.hash=x))}}},n);return H.useState=function(){var e=H,t=location.href;r.on(u,"popstate",function(){var n=location.href==t;(e.poped||!n)&&(e.poped=1,e.route())})},H.useHash=function(){r.on(u,"hashchange",H.route)},H},{requires:["magix/magix","magix/event","event"]}),KISSY.add("magix/body",function(e,t,n){var r=t.has;t.mix;var i,a=t.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),o=document.body,s={},c="mx-owner",u="mx-ie",f={},v=65536,p=function(e){return e.id||(e.id="mx-e-"+v--)},d=function(e,t,n){return n?e.setAttribute(t,n):n=e.getAttribute(t),n},l={process:function(e){for(var t=e.target||e.srcElement;t&&1!=t.nodeType;)t=t.parentNode;var n=t,a=e.type,s=f[a]||(f[a]=RegExp("(?:^|,)"+a+"(?:,|$)"));if(!s.test(d(t,u))){for(var v,l,h="mx-"+a,m=[];n&&n!=o&&(v=d(n,h),l=d(n,u),!v&&!s.test(l));)m.push(n),n=n.parentNode;if(v){var g=d(n,c);if(!g)for(var w=n,x=i.all();w&&w!=o;){if(r(x,w.id)){d(n,c,g=w.id);break}w=w.parentNode}if(!g)throw Error("miss "+c+":"+v);var b=i.get(g),y=b&&b.view;y&&y.processEvent({info:v,se:e,tId:p(t),cId:p(n)})}else for(var C,l;m.length;)C=m.shift(),l=d(C,u),s.test(l)||(l=l?l+","+a:a,d(C,u,l))}},on:function(e,t){var n=this;if(s[e])s[e]++;else{i=t,s[e]=1;var r=a[e];r?n.unbubble(0,o,e):o["on"+e]=function(e){e=e||window.event,e&&n.process(e)}}},un:function(e){var t=this,n=s[e];if(n>0){if(n--,!n){var r=a[e];r?t.unbubble(1,o,e):o["on"+e]=null}s[e]=n}}};return l.unbubble=function(e,t,r){var i=e?n.undelegate:n.delegate;i.call(n,t,r,"[mx-"+r+"]",l.process)},l},{requires:["magix/magix","event","sizzle"]}),KISSY.add("magix/event",function(e,t){var n=function(e){return"~"+e},r=t.safeExec,i={fire:function(e,t,i,a){var o=n(e),s=this,c=s[o];if(c){t||(t={}),t.type||(t.type=e);for(var u,f,v=c.length,p=v-1;v--;)u=a?v:p-v,f=c[u],(f.d||f.r)&&(c.splice(u,1),p--),f.d||r(f.f,t,s)}i&&delete s[o]},on:function(e,r,i){var a=n(e),o=this[a]||(this[a]=[]);t.isNumeric(i)?o.splice(i,0,{f:r}):o.push({f:r,r:i})},un:function(e,t){var r=n(e),i=this[r];if(i)if(t){for(var a,o=i.length-1;o>=0;o--)if(a=i[o],a.f==t&&!a.d){a.d=1;break}}else delete this[r]}};return i},{requires:["magix/magix"]}),KISSY.add("magix/vframe",function(e,t,n,r){var i,a,o,s=document,c=65536,u=window,f=t.safeExec,v=[].slice,p=u.CollectGarbage||t.noop,d=t.mix,l=t.config("tagName"),h=t.config("rootId"),m=!t.config("tagNameChanged"),g=t.has,w="mx-view",x=m?"mx-defer":"mx-vframe",b="alter",y="created",C=function(e){return"object"==typeof e?e:s.getElementById(e)},I=function(e,t){return C(e).getElementsByTagName(t)},E=function(e){return s.createElement(e)},S=function(e){return e.id||(e.id="magix_vf_"+c--)},V=/<script[^>]*>[\s\S]*?<\/script>/gi,M=function(e){var t=this;t.id=e,t.cM={},t.cC=0,t.rC=0,t.sign=1<<30,t.rM={}};return d(M,{root:function(e,t){if(!i){o=t;var n=C(h);n||(n=E(l),n.id=h,s.body.insertBefore(n,s.body.firstChild)),i=new M(h),e.add(i)}return i}}),d(d(M.prototype,n),{mountView:function(e,n,i){var a=this,s=C(a.id);if(s._bak?s._chgd=1:(s._bak=1,s._tmpl=s.innerHTML.replace(V,"")),a.unmountView(),e){var c=t.pathToObject(e),u=c.pathname,v=--a.sign;t.libRequire(u,function(e){if(v==a.sign){var t=a.owner;r.prepare(e);var p=new e({owner:a,id:a.id,$:C,path:u,vom:t,location:o});a.view=p,p.on("interact",function(e){e.tmpl||(s._chgd&&(s.innerHTML=s._tmpl),a.mountZoneVframes(0,0,1)),p.on("rendered",function(){a.mountZoneVframes(0,0,1)}),p.on("prerender",function(){a.unmountZoneVframes()||a.cAlter({caused:a.id})}),p.on("inited",function(){a.viewInited=1,a.fire("viewInited",{view:p}),i&&f(i,p,a)})},0),n=n||{},p.load(d(n,c.params,n))}})}},unmountView:function(){var e=this;if(e.view){a||(a={caused:e.id}),e.unmountZoneVframes(),e.cAlter(a),e.view.destroy();var t=C(e.id);t&&t._bak&&(t.innerHTML=t._tmpl),delete e.view,delete e.viewInited,a=0,e.fire("viewUnmounted"),p()}e.sign--},mountVframe:function(e,t,n,r){var i=this,a=i.owner,o=a.get(e);return o||(o=new M(e),o.pId=i.id,g(i.cM,e)||i.cC++,i.cM[e]=r,a.add(o)),o.mountView(t,n),o},mountZoneVframes:function(e,t,n){var r=this,i=e||r.id;r.unmountZoneVframes(i);var a=I(i,l),o=a.length,s={};if(o)for(var c,u,f,v,p=0;o>p;p++)if(c=a[p],u=S(c),!g(s,u)&&(f=c.getAttribute(w),v=!c.getAttribute(x)==m,v||f)){r.mountVframe(u,f,t,n);for(var d,h=I(c,l),b=0,y=h.length;y>b;b++)d=h[b],f=d.getAttribute(w),v=!c.getAttribute(x)==m,v||f||(s[S(d)]=1)}r.cC==r.rC&&r.cCreated({})},unmountVframe:function(e){var t=this;e=e||t.id;var n=t.owner,r=n.get(e);if(r){var i=r.fcc;r.unmountView(),n.remove(e,i),t.fire("destroy");var a=n.get(r.pId);a&&g(a.cM,e)&&(delete a.cM[e],a.cC--)}},unmountZoneVframes:function(e){var t,n,r=this;if(e){t=I(e,l);for(var i,a={},o=r.cM,s=t.length-1;s>=0;s--)i=t[s].id,g(o,i)&&(a[i]=1);t=a}else t=r.cM;for(var c in t)n=!0,r.unmountVframe(c);return n},invokeView:function(e){var t,n=this,r=n.view,i=v.call(arguments,1);return n.viewInited&&r[e]&&(t=f(r[e],i,r)),t},cCreated:function(e){var t=this,n=t.view;n&&!t.fcc&&(t.fcc=1,delete t.fca,n.fire(y,e),t.fire(y,e));var r=t.owner;r.vfCreated();var i=t.id,a=r.get(t.pId);a&&!g(a.rM,i)&&(a.rM[i]=a.cM[i],a.rC++,a.rC==a.cC&&a.cCreated(e))},cAlter:function(e){var t=this;if(delete t.fcc,!t.fca){var n=t.view,r=t.id;n&&(t.fca=1,n.fire(b,e),t.fire(b,e));var i=t.owner,a=i.get(t.pId);if(a&&g(a.rM,r)){var o=a.rM[r];a.rC--,delete a.rM[r],o&&a.cAlter(e)}}},locChged:function(e,n){var r=this,i=r.view;if(i&&i.sign&&i.rendered){var a=i.olChanged(n),o={location:e,changed:n,prevent:function(){this.cs=[]},toChildren:function(e){e=e||[],t.isString(e)&&(e=e.split(",")),this.cs=e}};a&&f(i.locationChange,o,i);for(var s,c=o.cs||t.keys(r.cM),u=0,v=c.length,p=r.owner;v>u;u++)s=p.get(c[u]),s&&s.locChged(e,n)}}}),M},{requires:["magix/magix","magix/event","magix/view"]}),KISSY.add("magix/view",function(e,t,n,r,i){var a=t.safeExec,o=t.has,s=",",c=[],u=t.mix,f=["render","renderUI"],v="~",p=function(e){return function(){var t,n=this,r=n.notifyUpdate();return r&&(t=e.apply(n,arguments)),t}},d=t.cache(40),l=function(e){var t=this;u(t,e),t.sign=1};u(l,{wrapUpdate:function(){var e=this;if(!e[v]){e[v]=1;for(var n,r,i=e.prototype,a=f.length-1;a>-1;a--)r=f[a],n=i[r],t.isFunction(n)&&n!=t.noop&&(i[r]=p(n))}}});var h=l.prototype,m=window.CollectGarbage||t.noop,g=/<[a-z]+(?:[^">]|"[^"]*")+(?=>)/g,w=/\smx-owner\s*=/,x=/\smx-[^v][a-z]+\s*=/,b=function(e){return!w.test(e)&&x.test(e)?e+' mx-owner="'+b.t+'"':e},y={prevent:function(e){e=e||this.domEvent,e.preventDefault?e.preventDefault():e.returnValue=!1},stop:function(e){e=e||this.domEvent,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},halt:function(e){this.prevent(e),this.stop(e)}},C=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,I=/(\w+):([^,]+)/g;u(h,n),u(h,{render:t.noop,locationChange:t.noop,init:t.noop,hasTmpl:!0,enableEvent:!0,load:function(){var e=this,t=e.hasTmpl,n=arguments,r=e.sign,i=o(e,"template"),s=function(o){if(r==e.sign){i||(e.template=e.wrapMxEvent(o)),e.delegateEvents(),e.fire("interact",{tmpl:t},1),a(e.init,n,e),e.fire("inited",0,1),a(e.render,c,e);var s=!t&&!e.rendered;s&&(e.rendered=!0,e.fire("primed",null,1))}};t&&!i?e.fetchTmpl(s):s()},beginUpdate:function(){var e=this;e.sign&&e.rendered&&(e.fire("refresh",0,1),e.fire("prerender"))},endUpdate:function(){var e=this;e.sign&&(e.rendered||e.fire("primed",0,1),e.rendered=!0,e.fire("rendered"),m())},notifyUpdate:function(){var e=this;return e.sign&&(e.sign++,e.fire("rendercall")),e.sign},wrapMxEvent:function(e){return b.t=this.id,(e+"").replace(g,b)},setViewHTML:function(e){var t,n=this;n.beginUpdate(),n.sign&&(t=n.$(n.id),t&&(t.innerHTML=e)),n.endUpdate()},observeLocation:function(e){var n,r=this;r.$ol||(r.$ol={keys:[]}),n=r.$ol;var i=n.keys;t.isObject(e)&&(n.pn=e.pathname,e=e.keys),e&&(n.keys=i.concat((e+"").split(s)))},olChanged:function(e){var t=this,n=t.$ol;if(n){var r=0;if(n.pn&&(r=e.isPathname()),!r){var i=n.keys;r=e.isParam(i)}return r}return 1},destroy:function(){var e=this;e.fire("refresh",0,1),e.fire("destroy",0,1,1),e.delegateEvents(1),e.sign=0},parentView:function(){var e=this,t=e.vom,n=e.owner,r=t.get(n.pId),i=null;return r&&r.viewInited&&(i=r.view),i},processEvent:function(e){var t=this;if(t.enableEvent&&t.sign){var n=e.info,r=e.se,i=d.get(n);i||(i=n.match(C),i={n:i[1],f:i[2],i:i[3],p:{}},i.i&&i.i.replace(I,function(e,t,n){i.p[t]=n}),d.set(n,i));var o=t.events;if(o){var s=o[r.type],c=y[i.f];c&&c.call(y,r),c=s&&s[i.n],c&&a(c,u({view:t,currentId:e.cId,targetId:e.tId,domEvent:r,events:o,params:i.p},y),s)}}},delegateEvents:function(e){var t=this,n=t.events,i=e?r.un:r.on,a=t.vom;for(var o in n)i.call(r,o,a)}});var E=t.config("appHome"),S=t.config("debug")?"?t="+e.now():"",V=function(t,n,r){for(var i in n)e.isObject(n[i])?(o(t,i)||(t[i]={}),V(t[i],n[i],1)):r&&(t[i]=n[i])};return l.prototype.fetchTmpl=function(e){var n=this,r="template"in n;if(r)e(tmpl);else{var o=t.tmpl(n.path);if(o.h)e(o.v);else{var s=E+n.path+".html",c=V[s],u=function(r){e(t.tmpl(n.path,r))};c?c.push(u):(c=V[s]=[u],i({url:s+S,success:function(e){a(c,e),delete V[s]},error:function(e,t){a(c,t),delete V[s]}}))}}},l.extend=function(t,n,r){var i=this,o=function(){o.superclass.constructor.apply(this,arguments),n&&a(n,arguments,this)};return o.extend=i.extend,e.extend(o,i,t,r)},l.prepare=function(e){var t=this;if(!e.wrapUpdate){e.wrapUpdate=t.wrapUpdate,e.extend=t.extend;for(var n,r=e.prototype,i=e.superclass;i;)n=i.constructor,V(r,n.prototype),i=n.superclass}e.wrapUpdate()},l},{requires:["magix/magix","magix/event","magix/body","ajax"]}),KISSY.add("magix/vom",function(e,t,n,r){var i=n.has,a=n.mix,o=0,s=0,c=0,u=0,f={},v={},p=n.mix({all:function(){return f},add:function(e){i(f,e.id)||(o++,f[e.id]=e,e.owner=p,p.fire("add",{vframe:e}))},get:function(e){return f[e]},remove:function(e,t){var n=f[e];n&&(o--,t&&s--,delete f[e],p.fire("remove",{vframe:n}))},vfCreated:function(){if(!u){s++;var e=s/o;e>c&&p.fire("progress",{percent:c=e},u=1==e)}},root:function(){return t.root(p,v)},locChged:function(e){var t,n=e.loc;if(n?t=1:n=e.location,a(v,n),!t){var r=p.root(),i=e.changed;i.isView()?r.mountView(n.view):r.locChged(n,i)}}},r);return p},{requires:["magix/vframe","magix/magix","magix/event"]}),function(e){document.createElement("vframe");var t=function(){};e.console||(e.console={log:t,info:t,warn:t});var n,r={};e.Magix||(e.Magix={config:function(e){for(var t in e)r[t]=e[t]},start:function(e){n=e}},KISSY.use("magix/magix",function(t,i){e.Magix=i,i.config(r),n&&i.start(n)}))}(this);
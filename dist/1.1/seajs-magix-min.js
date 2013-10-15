define("magix/magix",function(){var e=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,t=/\/[^\/]*$/,n=/[#?].*$/,r="",i=/([^=&?\/#]+)=?([^&=#?]*)/g,a="pathname",o=/^https?:\/\//i,c=0,s="/",f="vframe",u=function(){throw Error("unimplement method")},v=function(){},m={tagName:f,rootId:"magix_vf_root",execError:v},d={}.hasOwnProperty,l=function(e,t){return e?d.call(e,t):e},p=function(e){return function(t,n,r){switch(arguments.length){case 0:r=e;break;case 1:r=C.isObject(t)?x(e,t):l(e,t)?e[t]:null;break;case 2:null===n?(delete e[t],r=n):e[t]=r=n}return r}},h=function(e,t){return t.f==e.f?t.t-e.t:t.f-e.f},g=function(e,t){var n=this;return n.get?(n.c=[],n.x=e||20,n.b=n.x+(isNaN(t)?5:t),void 0):new g(e,t)},x=function(e,t,n){for(var r in t)n&&l(n,r)||(e[r]=t[r]);return e};x(g.prototype,{get:function(e){var t,n=this,r=n.c;return e=a+e,l(r,e)&&(t=r[e],t.f>=1&&(t.f++,t.t=c++,t=t.v)),t},set:function(e,t,n){var r=this,i=r.c,o=a+e,s=i[o];if(!l(i,o)){if(i.length>=r.b){i.sort(h);for(var f=r.b-r.x;f--;)s=i.pop(),delete i[s.k],s.m&&y(s.m,s.o,s)}s={},i.push(s),i[o]=s}return s.o=e,s.k=o,s.v=t,s.f=1,s.t=c++,s.m=n,t},del:function(e){e=a+e;var t=this.c,n=t[e];n&&(n.f=-1e5,n.v=r,delete t[e],n.m&&(y(n.m,n.o,n),n.m=0))},has:function(e){return e=a+e,l(this.c,e)}});var w=g(60),b=g(),y=function(e,t,n,r,i,a){for(C.isArray(e)||(e=[e]),t&&(C.isArray(t)||t.callee)||(t=[t]),r=0;e.length>r;r++)try{a=e[r],i=a&&a.apply(n,t)}catch(o){m.execError(o)}return i},C={isArray:u,isObject:u,isFunction:u,isRegExp:u,isString:u,isNumber:u,isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},libRequire:u,include:u,mix:x,unimpl:u,has:l,safeExec:y,noop:v,config:p(m),start:function(e){var t=this;x(m,e),t.libRequire(m.iniFile,function(n){m=x(m,n,e),m.tagNameChanged=m.tagName!=f;var r=m.progress;t.libRequire(["magix/router","magix/vom"],function(e,n){e.on("!ul",n.locChged),e.on("changed",n.locChged),r&&n.on("progress",r),t.libRequire(m.extensions,e.start)})})},keys:Object.keys||function(e){var t=[];for(var n in e)l(e,n)&&t.push(n);return t},local:p({}),path:function(i,a){var c=i+"\n"+a,f=b.get(c);if(!f){if(o.test(a))f=a;else if(i=i.replace(n,r).replace(t,r)+s,a.charAt(0)==s){var u=o.test(i)?8:0,v=i.indexOf(s,u);f=i.substring(0,v)+a}else f=i+a;for(;e.test(f);)f=f.replace(e,"$1/");b.set(c,f)}return f},pathToObject:function(e,t){var c=w.get(e);if(!c){c={};var f={},u=r;n.test(e)?u=e.replace(n,r):~e.indexOf("=")||(u=e);var v=e.replace(u,r);if(u&&o.test(u)){var m=u.indexOf(s,8);u=~m?u.substring(m):s}v.replace(i,function(e,n,r){if(t)try{r=decodeURIComponent(r)}catch(i){}f[n]=r}),c[a]=u,c.params=f,w.set(e,c)}return c},objectToPath:function(e,t,n){var r,i=e[a],o=[],c=e.params;for(var s in c)r=c[s],(!n||r||l(n,s))&&(t&&(r=encodeURIComponent(r)),o.push(s+"="+r));return o.length&&(i=i+"?"+o.join("&")),i},listToMap:function(e,t){var n,r,i,a={};if(C.isString(e)&&(e=e.split(",")),e&&(i=e.length))for(n=0;i>n;n++)r=e[n],a[t?r[t]:r]=t?r:1;return a},cache:g},E=Object.prototype.toString;return x(C,{libRequire:function(e,t){e?seajs.use(e,t):t&&t()},isArray:$.isArray,isFunction:$.isFunction,isObject:function(e){return"[object Object]"==E.call(e)},isString:function(e){return"[object String]"==E.call(e)},isNumber:function(e){return"[object Number]"==E.call(e)},isRegExp:function(e){return"[object RegExp]"==E.call(e)},extend:function(e,t,n,r){e.superclass=t.prototype,t.prototype.constructor=t;var i=function(){};return i.prototype=t.prototype,e.prototype=new i,C.mix(e.prototype,n),C.mix(e,r),e.prototype.constructor=e,e}})}),define("magix/router",["magix/magix","magix/event"],function(e){var t,n,r,i,a=e("magix/magix"),o=e("magix/event"),c=window,s="",f="pathname",u=a.has,v=a.mix,m=document,d=/^UTF-8$/i.test(m.charset||m.characterSet||"UTF-8"),l=a.config(),p=a.cache(),h=a.cache(40),g={params:{},href:s},x=/#.*$/,w=/^[^#]*#?!?/,b="params",y=l.nativeHistory,C=function(e,t,n){if(e){n=this[b],a.isString(e)&&(e=e.split(","));for(var r=0;e.length>r&&!(t=u(n,e[r]));r++);}return t},E=function(){return u(this,f)},V=function(){return u(this,"view")},j=function(e,t,n){return t=this,n=t[b],n[e]},M=function(e){var t=a.pathToObject(e,d),n=t[f];return n&&i&&(t[f]=a.path(c.location[f],n)),t},I=v({getView:function(e,t){if(!n){n={rs:l.routes||{},nf:l.notFoundView};var r=l.defaultView;if(!r)throw Error("unset defaultView");n.home=r;var i=l.defaultPathname||s;n.rs[i]=r,n[f]=i}var o;e||(e=n[f]);var c=n.rs;return o=a.isFunction(c)?c.call(l,e,t):c[e],{view:o?o:n.nf||n.home,pathname:o||y?e:n.nf?e:n[f]}},start:function(){var e=I,t=c.history;r=y&&t.pushState,i=y&&!r,r?e.useState():e.useHash(),e.route()},parseQH:function(e,t){e=e||c.location.href;var n=I,r=p.get(e);if(!r){var i=e.replace(x,s),a=e.replace(w,s),o=M(i),u=M(a),m={};v(m,o[b]),v(m,u[b]),r={get:j,href:e,refHref:g.href,srcQuery:i,srcHash:a,query:o,hash:u,params:m},p.set(e,r)}if(t&&!r.view){var d;d=y?r.hash[f]||r.query[f]:r.hash[f];var l=n.getView(d,r);v(r,l)}return r},getChged:function(e,t){var n=e.href,r=t.href,i=n+"\n"+r,a=h.get(i);if(a||(i=r+"\n"+i,a=h.get(i)),!a){var o,c,s;a={params:{}},c=e[f],s=t[f],c!=s&&(a[f]={from:c,to:s},o=1),c=e.view,s=t.view,c!=s&&(a.view={from:c,to:s},o=1);var u,v=e[b],m=t[b];for(u in v)c=v[u],s=m[u],v[u]!=m[u]&&(o=1,a[b][u]={from:c,to:s});for(u in m)c=v[u],s=m[u],v[u]!=m[u]&&(o=1,a[b][u]={from:c,to:s});a.occur=o,a.isParam=C,a.isPathname=E,a.isView=V,h.set(i,a)}return a},route:function(){var e=I,n=e.parseQH(0,1),r=!g.get,i=e.getChged(g,n);g=n,i.occur&&(t=n,e.fire("changed",{location:n,changed:i,force:r}))},navigate:function(e,n,o){var c=I;if(!n&&a.isObject(e)&&(n=e,e=s),n&&(e=a.objectToPath({params:n,pathname:e},d)),e){var m=M(e),l={};if(l[b]=v({},m[b]),l[f]=m[f],l[f]){if(i){var p=t.query[b];for(var h in p)u(p,h)&&!u(l[b],h)&&(l[b][h]=s)}}else{var g=v({},t[b]);l[b]=v(g,l[b]),l[f]=t[f]}var x,w=a.objectToPath(l,d,t.query[b]);x=r?w!=t.srcQuery:w!=t.srcHash,x&&(r?(c.poped=1,history[o?"replaceState":"pushState"](null,null,w),c.route()):(v(l,t,l),l.srcHash=w,l.hash={params:l[b],pathname:l[f]},c.fire("!ul",{loc:t=l}),w="#!"+w,o?location.replace(w):location.hash=w))}}},o);return I.useState=function(){var e=I,t=location.href;c.addEventListener("popstate",function(){var n=location.href==t;(e.poped||!n)&&(e.poped=1,e.route())},!1)},I.useHash=function(){c.addEventListener("hashchange",I.route,!1)},I}),define("magix/body",["magix/magix"],function(e){var t,n=e("magix/magix"),r=n.has,i=n.mix,a={},o=document.body,c={},s=String.fromCharCode(26),f="mx-owner",u="mx-ei",v={},m=65536,d=function(e){return e.id||(e.id="mx-e-"+m--)},l=function(e,t,n){return n?e.setAttribute(t,n):e&&e.getAttribute&&(n=e.getAttribute(t)),n},p={special:function(e){i(a,e)},process:function(e){for(var n=e.target||e.srcElement;n&&1!=n.nodeType;)n=n.parentNode;var i=n,a=e.type,c=v[a]||(v[a]=RegExp("(?:^|,)"+a+"(?:,|$)"));if(!c.test(l(n,u))){for(var m,p,h="mx-"+a,g=[];i&&i!=o&&(m=l(i,h),p=l(i,u),!m&&!c.test(p));)g.push(i),i=i.parentNode;if(m){var x,w=m.indexOf(s);w>-1&&(x=m.slice(0,w),m=m.slice(w));var b=l(i,f)||x;if(!b)for(var y=i,C=t.all();y&&y!=o;){if(r(C,y.id)){l(i,f,b=y.id);break}y=y.parentNode}if(!b)throw Error("miss "+f+":"+m);var E=t.get(b),V=E&&E.view;V&&V.processEvent({info:m,se:e,st:a,tId:d(n),cId:d(i)})}else for(var j;g.length;)j=g.shift(),p=l(j,u),c.test(p)||(p=p?p+","+a:a,l(j,u,p))}},on:function(e,n){var r=this;if(!c[e]){t=n,c[e]=0;var i=a[e];i?r.lib(0,o,e):o["on"+e]=function(e){e=e||window.event,e&&r.process(e)}}c[e]++},un:function(e){var t=this,n=c[e];if(n>0){if(n--,!n){var r=a[e];r?t.lib(1,o,e):o["on"+e]=null}c[e]=n}}};return p.lib=function(e,t,n){var r=e?"undelegate":"delegate";$(t)[r]("[mx-"+n+"]",n,p.process)},p}),define("magix/event",["magix/magix"],function(e){var t=e("magix/magix"),n=function(e){return"~"+e},r=t.safeExec,i={fire:function(e,t,i,a){var o=n(e),c=this,s=c[o];if(s){t||(t={}),t.type||(t.type=e);for(var f,u,v=s.length,m=v-1;v--;)f=a?v:m-v,u=s[f],(u.d||u.r)&&(s.splice(f,1),m--),u.d||r(u.f,t,c)}i&&delete c[o]},on:function(e,r,i){var a=n(e),o=this[a]||(this[a]=[]);t.isNumeric(i)?o.splice(i,0,{f:r}):o.push({f:r,r:i})},un:function(e,t){var r=n(e),i=this[r];if(i)if(t){for(var a,o=i.length-1;o>=0;o--)if(a=i[o],a.f==t&&!a.d){a.d=1;break}}else delete this[r]}};return i}),define("magix/vframe",["magix/magix","magix/event","magix/view"],function(e){var t,n,r,i=e("magix/magix"),a=e("magix/event"),o=e("magix/view"),c=document,s=65536,f=i.safeExec,u=[].slice,v=i.mix,m=i.config("tagName"),d=i.config("rootId"),l=!i.config("tagNameChanged"),p=i.has,h="mx-view",g=l?"mx-defer":"mx-vframe",x="alter",w="created",b=function(e){return"object"==typeof e?e:c.getElementById(e)},y=function(e,t,n){return n=b(e),n?n.getElementsByTagName(t):[]},C=function(e){return e.id||(e.id="magix_vf_"+s--)},E=function(e,t,n){if(e=b(e),t=b(t),e&&t)if(e!==t)try{n=t.contains?t.contains(e):16&t.compareDocumentPosition(e)}catch(r){n=0}else n=1;return n},V=/<script[^>]*>[\s\S]*?<\/script>/gi,j=function(e){var t=this;t.id=e,t.cM={},t.cC=0,t.rC=0,t.sign=1<<30,t.rM={}};return v(j,{root:function(e,n){if(!t){r=n;var i=b(d);i||(i=c.createElement(m),i.id=d,c.body.insertBefore(i,c.body.firstChild)),t=new j(d),e.add(t)}return t}}),v(v(j.prototype,a),{mountView:function(e,t,n){var a=this,c=b(a.id);if(c._bak?c._chgd=1:(c._bak=1,c._tmpl=c.innerHTML.replace(V,"")),a.unmountView(),e){var s=i.pathToObject(e),u=s.pathname,m=--a.sign;i.libRequire(u,function(e){if(m==a.sign){var i=a.owner;o.prepare(e);var d=new e({owner:a,id:a.id,$:b,path:u,vom:i,location:r});a.view=d,d.on("interact",function(e){e.tmpl||(c._chgd&&(c.innerHTML=c._tmpl),a.mountZoneVframes(0,0,1)),d.on("rendered",function(){a.mountZoneVframes(0,0,1)}),d.on("prerender",function(){a.unmountZoneVframes(0,1)||a.cAlter()}),d.on("inited",function(){a.viewInited=1,a.fire("viewInited",{view:d}),n&&f(n,d,a)})},0),t=t||{},d.load(v(t,s.params,t))}})}},unmountView:function(){var e=this;if(e.view){n||(n={}),e.unmountZoneVframes(0,1),e.cAlter(n),e.view.destroy();var t=b(e.id);t&&t._bak&&(t.innerHTML=t._tmpl),delete e.view,delete e.viewInited,n=0,e.fire("viewUnmounted")}e.sign--},mountVframe:function(e,t,n){var r=this,i=r.owner,a=i.get(e);return a||(a=new j(e),a.pId=r.id,p(r.cM,e)||r.cC++,r.cM[e]=1,i.add(a)),a.mountView(t,n),a},mountZoneVframes:function(e,t){var n=this,r=e||n.id;n.unmountZoneVframes(r,1);var i=y(r,m),a=i.length,o={};if(a)for(var c,s,f,u,v=0;a>v;v++)if(c=i[v],s=C(c),!p(o,s)&&(f=c.getAttribute(h),u=!c.getAttribute(g),u=u==l,u||f)){n.mountVframe(s,f,t);for(var d,x=y(c,m),w=0,b=x.length;b>w;w++)d=x[w],f=d.getAttribute(h),u=!d.getAttribute(g),u=u==l,u||f||(o[C(d)]=1)}n.cCreated()},unmountVframe:function(e,t){var n=this;e=e||n.id;var r=n.owner,i=r.get(e);if(i){var a=i.fcc;i.unmountView(),r.remove(e,a),n.fire("destroy");var o=r.get(i.pId);o&&p(o.cM,e)&&(delete o.cM[e],o.cC--,t||o.cCreated())}},unmountZoneVframes:function(e,t){var n,r,i,a=this;if(e){var o=a.cM,c={};for(i in o)E(i,e)&&(c[i]=1);n=c}else n=a.cM;for(i in n)r=1,a.unmountVframe(i,1);return t||a.cCreated(),r},invokeView:function(e){var t,n=this,r=n.view,i=u.call(arguments,1);return n.viewInited&&r[e]&&(t=f(r[e],i,r)),t},cCreated:function(e){var t=this;if(t.cC==t.rC){var n=t.view;n&&!t.fcc&&(t.fcc=1,delete t.fca,n.fire(w,e),t.fire(w,e));var r=t.owner;r.vfCreated();var i=t.id,a=r.get(t.pId);a&&!p(a.rM,i)&&(a.rM[i]=a.cM[i],a.rC++,a.cCreated(e))}},cAlter:function(e){var t=this;if(e||(e={}),delete t.fcc,!t.fca){var n=t.view,r=t.id;n&&(t.fca=1,n.fire(x,e),t.fire(x,e));var i=t.owner,a=i.get(t.pId);a&&p(a.rM,r)&&(a.rC--,delete a.rM[r],a.cAlter(e))}},locChged:function(e,t){var n=this,r=n.view;if(r&&r.sign>0&&r.rendered){var a=r.olChanged(t),o={location:e,changed:t,prevent:function(){this.cs=[]},toChildren:function(e){e=e||[],i.isString(e)&&(e=e.split(",")),this.cs=e}};a&&f(r.locationChange,o,r);for(var c,s=o.cs||i.keys(n.cM),u=0,v=s.length,m=n.owner;v>u;u++)c=m.get(s[u]),c&&c.locChged(e,t)}}}),j}),define("magix/view",function(e){var t=e("magix/magix"),n=e("magix/event"),r=e("magix/body"),i=t.safeExec,a=t.has,o=",",c=[],s=t.noop,f=t.mix,u={render:1,renderUI:1},v="~",m=function(e){return function(){var t,n=this,r=n.notifyUpdate();return r&&(t=e.apply(n,arguments)),t}},d=t.cache(40),l=/\smx-(?!view|defer|owner)[a-z]+\s*=\s*['"]/g,p=String.fromCharCode(26),h=function(){this.render()},g={prevent:function(e){e=e||this.domEvent,e.preventDefault?e.preventDefault():e.returnValue=!1},stop:function(e){e=e||this.domEvent,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},halt:function(e){this.prevent(e),this.stop(e)}},x=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,w=/(\w+):([^,]+)/g,b=/([$\w]+)<([\w,]+)>/,y=function(e){var t=this;f(t,e),t.sign=1,i(y.ms,[e],t)};y.ms=[],y.prepare=function(e){var t=this,n=e.superclass;if(n&&t.prepare(n.constructor),!e[v]){e[v]=1,e.extend=t.extend;var r,i,c,f,d,l=e.prototype,h={};for(var g in l)if(a(l,g))if(r=l[g],i=g.match(b))for(c=i[1],f=i[2],f=f.split(o),d=f.length-1;d>-1;d--)i=f[d],h[i]=1,l[c+p+i]=r;else a(u,g)&&r!=s&&(l[g]=m(r));f&&(l.$evts=h)}},y.mixin=function(e,t){y.ms.push(t),f(y.prototype,e)},f(f(y.prototype,n),{render:s,locationChange:s,init:s,hasTmpl:!0,enableEvent:!0,load:function(){var e=this,t=e.hasTmpl,n=arguments,r=e.sign,o=a(e,"template"),s=function(a){if(r==e.sign){o||(e.template=e.wrapMxEvent(a)),e.delegateEvents(),e.fire("interact",{tmpl:t},1),i(e.init,n,e),e.fire("inited",0,1),i(e.render,c,e);var s=!t&&!e.rendered;s&&(e.rendered=!0,e.fire("primed",null,1))}};t&&!o?e.fetchTmpl(s):s()},beginUpdate:function(){var e=this;e.sign&&e.rendered&&(e.fire("refresh",0,1),e.fire("prerender"))},endUpdate:function(){var e=this;e.sign&&(e.rendered||e.fire("primed",0,1),e.rendered=!0,e.fire("rendered"))},notifyUpdate:function(){var e=this;return e.sign&&(e.sign++,e.fire("rendercall")),e.sign},wrapMxEvent:function(e){return(e+"").replace(l,"$&"+this.id+p)},setViewHTML:function(e){var t,n=this;n.beginUpdate(),n.sign&&(t=n.$(n.id),t&&(t.innerHTML=e)),n.endUpdate()},observeLocation:function(e){var n,r=this;r.$ol||(r.$ol={keys:[]}),n=r.$ol;var i=n.keys;t.isObject(e)&&(n.pn=e.pathname,e=e.keys),e&&(n.keys=i.concat((e+"").split(o))),r.locationChange==s&&(r.locationChange=h)},olChanged:function(e){var t=this,n=t.$ol;if(n){var r=0;if(n.pn&&(r=e.isPathname()),!r){var i=n.keys;r=e.isParam(i)}return r}return 1},destroy:function(){var e=this;e.sign>0&&(e.sign=0),e.sign--,e.fire("refresh",0,1),e.fire("destroy",0,1,1),e.delegateEvents(1)},processEvent:function(e){var t=this;if(t.enableEvent&&t.sign){var n=e.info,r=e.se,a=d.get(n);a||(a=n.match(x),a={n:a[1],f:a[2],i:a[3],p:{}},a.i&&a.i.replace(w,function(e,t,n){a.p[t]=n}),d.set(n,a));var o=a.n+p+e.st,c=t[o];if(c){var s=g[a.f];s&&s.call(g,r),i(c,f({currentId:e.cId,targetId:e.tId,type:e.st,domEvent:r,params:a.p},g),t)}}},delegateEvents:function(e){var t=this,n=t.$evts,i=e?r.un:r.on,a=t.vom;for(var o in n)i.call(r,o,a)}});var C,E="?t="+Date.now(),V={},j={};return y.prototype.fetchTmpl=function(e){var t=this,n="template"in t;if(n)e(t.template);else if(a(V,t.path))e(V[t.path]);else{var r=t.path.indexOf("/");if(!C){var o=t.path.substring(0,r);C=seajs.data.paths[o]}var c=t.path.substring(r+1),s=C+c+".html",f=j[s],u=function(n){e(V[t.path]=n)};f?f.push(u):(f=j[s]=[u],$.ajax({url:s+E,success:function(e){i(f,e),delete j[s]},error:function(e,t){i(f,t),delete j[s]}}))}},y.extend=function(e,n,r){var a=this,o=function(){o.superclass.constructor.apply(this,arguments),n&&i(n,arguments,this)};return o.extend=a.extend,t.extend(o,a,e,r)},y}),define("magix/vom",["magix/vframe","magix/magix","magix/event"],function(e){var t=e("magix/vframe"),n=e("magix/magix"),r=e("magix/event"),i=n.has,a=n.mix,o=0,c=0,s=0,f=0,u={},v={},m=n.mix({all:function(){return u},add:function(e){i(u,e.id)||(o++,u[e.id]=e,m.fire("add",{vframe:e})),e.owner=m},get:function(e){return u[e]},remove:function(e,t){var n=u[e];n&&(o--,t&&c--,delete u[e],m.fire("remove",{vframe:n}))},vfCreated:function(){if(!f){c++;var e=c/o;e>s&&m.fire("progress",{percent:s=e},f=1==e)}},root:function(){return t.root(m,v)},locChged:function(e){var t,n=e.loc;if(n?t=1:n=e.location,a(v,n),!t){var r=m.root(),i=e.changed;i.isView()?r.mountView(n.view):r.locChged(n,i)}}},r);return m}),document.createElement("vframe");
(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[8],{42:function(e,t,a){"use strict";var n=a(0),c=a.n(n);a(49);t.a=function(e){return c.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},49:function(e,t,a){},62:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(47),c=a.n(n),r=a(48),s=a(10),l=a(0),i=a.n(l),u=a(50),m=a(15),o=a(51),p=a(42),f=a(8),E=(a(62),function(e){return i.a.createElement("div",{className:"avatar ".concat(e.className),style:e.style},i.a.createElement("img",{src:e.image,alt:e.alt,style:{width:e.width,height:e.width}}))}),d=(a(63),function(e){return i.a.createElement("li",{className:"user-item"},i.a.createElement(p.a,{className:"user-item__content"},i.a.createElement(f.b,{to:"/".concat(e.id,"/places")},i.a.createElement("div",{className:"user-item__image"},i.a.createElement(E,{image:"".concat("https://tweek-places.herokuapp.com","/").concat(e.image),alt:e.name})),i.a.createElement("div",{className:"user-item__info"},i.a.createElement("h2",null,e.name),i.a.createElement("h3",null,e.placeCount," ",1===e.placeCount?"Place":"Places")))))}),h=(a(64),function(e){return 0===e.items.length?i.a.createElement("div",{className:"center"},i.a.createElement(p.a,null,i.a.createElement("h2",null,"No users found."))):i.a.createElement("ul",{className:"users-list"},e.items.map((function(e){return i.a.createElement(d,{key:e.id,id:e.id,image:e.image,name:e.name,placeCount:e.places.length})})))});t.default=function(){var e=Object(o.a)(),t=e.isLoading,a=e.error,n=e.sendRequest,p=e.clearError,f=Object(l.useState)(),E=Object(s.a)(f,2),d=E[0],v=E[1];return Object(l.useEffect)((function(){(function(){var e=Object(r.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n("".concat("https://tweek-places.herokuapp.com/api","/users"));case 3:t=e.sent,v(t.users),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[n]),i.a.createElement(i.a.Fragment,null,i.a.createElement(u.a,{error:a,onClear:p}),t&&i.a.createElement("div",{className:"center"},i.a.createElement(m.a,null)),!t&&d&&i.a.createElement(h,{items:d}))}}}]);
//# sourceMappingURL=8.c34c5273.chunk.js.map
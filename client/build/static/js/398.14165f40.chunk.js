"use strict";(self.webpackChunkgameflix=self.webpackChunkgameflix||[]).push([[398,84],{9772:function(e,a,s){s.r(a),s.d(a,{default:function(){return P}});s(7762);var r=s(4165),n=s(5861),t=s(9439),i=s(2791),c=s(1413);function l(e,a){if(null==e)return{};var s,r,n=function(e,a){if(null==e)return{};var s,r,n={},t=Object.keys(e);for(r=0;r<t.length;r++)s=t[r],a.indexOf(s)>=0||(n[s]=e[s]);return n}(e,a);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);for(r=0;r<t.length;r++)s=t[r],a.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(e,s)&&(n[s]=e[s])}return n}var o=["count","wrapper","className","containerClassName","containerTestId","circle","style"],u=i.createContext({});function d(e){for(var a,s,r,n=e.count,d=void 0===n?1:n,m=e.wrapper,h=e.className,g=e.containerClassName,p=e.containerTestId,_=e.circle,v=void 0!==_&&_,f=e.style,x=l(e,o),j=i.useContext(u),b=(0,c.Z)({},x),N=0,y=Object.entries(x);N<y.length;N++){var k=(0,t.Z)(y[N],2),C=k[0];"undefined"===typeof k[1]&&delete b[C]}var w=(0,c.Z)((0,c.Z)((0,c.Z)({},j),b),{},{circle:v}),S=(0,c.Z)((0,c.Z)({},f),function(e){var a=e.baseColor,s=e.highlightColor,r=e.width,n=e.height,t=e.borderRadius,i=e.circle,c=e.direction,l=e.duration,o=e.enableAnimation,u=void 0===o||o,d={};return"rtl"===c&&(d["--animation-direction"]="reverse"),"number"===typeof l&&(d["--animation-duration"]="".concat(l,"s")),u||(d["--pseudo-element-display"]="none"),"string"!==typeof r&&"number"!==typeof r||(d.width=r),"string"!==typeof n&&"number"!==typeof n||(d.height=n),"string"!==typeof t&&"number"!==typeof t||(d.borderRadius=t),i&&(d.borderRadius="50%"),"undefined"!==typeof a&&(d["--base-color"]=a),"undefined"!==typeof s&&(d["--highlight-color"]=s),d}(w)),Z="react-loading-skeleton";h&&(Z+=" ".concat(h));for(var P=null!==(a=w.inline)&&void 0!==a&&a,E=[],O=Math.ceil(d),R=0;R<O;R++){var I=S;if(O>d&&R===O-1){var G=null!==(s=I.width)&&void 0!==s?s:"100%",D=d%1,z="number"===typeof G?G*D:"calc(".concat(G," * ").concat(D,")");I=(0,c.Z)((0,c.Z)({},I),{},{width:z})}var M=i.createElement("span",{className:Z,style:I,key:R},"\u200c");P?E.push(M):E.push(i.createElement(i.Fragment,{key:R},M,i.createElement("br",null)))}return i.createElement("span",{className:g,"data-testid":p,"aria-live":"polite","aria-busy":null===(r=w.enableAnimation)||void 0===r||r},m?E.map((function(e,a){return i.createElement(m,{key:a},e)})):E)}var m=s(4569),h=s.n(m),g=s(184),p=function(e){var a=e.count;return"full"==e.type?(0,g.jsx)("section",{className:"skeleton_card_wrapper",children:(0,g.jsx)("ul",{className:"list",children:Array(a).fill().map((function(e,a){return(0,g.jsxs)("li",{className:"card",children:[(0,g.jsx)(d,{height:180,className:"card_banner",highlightColor:"#323232"}),(0,g.jsxs)("h4",{className:"card-title",children:[(0,g.jsx)(d,{className:"card_cover",baseCover:"rgb(35, 35, 35)",highlightColor:"#222222",circle:!1})," ","\xa0",(0,g.jsx)(d,{className:"skeleton_title",highlightColor:"#222222",baseCover:"rgb(35, 35, 35)"})]}),(0,g.jsx)("p",{children:(0,g.jsx)(d,{style:{marginLeft:"10px"},className:"card-channel",width:"60%",highlightColor:"#222222"})}),(0,g.jsx)("div",{children:(0,g.jsx)(d,{style:{marginLeft:"10px"},className:"card-metrics",width:"90%",highlightColor:"#222222"})})]},a)}))})}):(0,g.jsx)("section",{className:"skeleton_card_wrapper",children:(0,g.jsx)("ul",{className:"list_small",children:Array(a).fill().map((function(e,a){return(0,g.jsxs)("li",{className:"card_small",children:[(0,g.jsx)(d,{height:104,className:"card_banner_small",highlightColor:"#222222",enableAnimation:!1}),(0,g.jsxs)("h4",{className:"card-title_small",children:[(0,g.jsx)(d,{className:"card_cover_small",circle:!1,highlightColor:"#222222"})," ","\xa0",(0,g.jsx)(d,{className:"skeleton_title_small",highlightColor:"#222222"})]})]},a)}))})})},_=s(7689),v=s(1087),f=s(6355),x=s(3676),j=s(1784),b=s(3224),N=s(1879),y=s(3433),k="...",C=function(e,a){var s=a-e+1;return Array.from({length:s},(function(a,s){return s+e}))},w=function(e){var a=e.onPageChange,s=e.totalCount,r=e.siblingCount,n=void 0===r?1:r,t=e.currentPage,c=e.pageSize,l=(e.className,function(e){var a=e.totalCount,s=e.pageSize,r=e.siblingCount,n=void 0===r?1:r,t=e.currentPage;return(0,i.useMemo)((function(){var e=Math.ceil(a/s);if(n+5>=e)return C(1,e);var r=Math.max(t-n,1),i=Math.min(t+n,e),c=r>2,l=i<e-2,o=1,u=e;if(!c&&l){var d=C(1,3+2*n);return[].concat((0,y.Z)(d),[k,e])}if(c&&!l){var m=C(e-(3+2*n)+1,e);return[o,k].concat((0,y.Z)(m))}if(c&&l){var h=C(r,i);return[o,k].concat((0,y.Z)(h),[k,u])}}),[a,s,n,t])}({currentPage:t,totalCount:s,siblingCount:n,pageSize:c}));if(0===t||l.length<2)return null;var o=l[l.length-1];return(0,g.jsxs)("ul",{className:"pagination-container",children:[(0,g.jsx)("li",{className:"pagination-item ".concat(1===t&&"disabled"),onClick:function(){a(t-1)},children:(0,g.jsx)("div",{className:"arrow left"})}),l.map((function(e){return e===k?(0,g.jsx)("li",{className:"pagination-item dots",children:"..."},"dots ".concat(e)):(0,g.jsx)("li",{className:"pagination-item ".concat(e===t&&"selected"),onClick:function(){return a(e)},children:e},"number ".concat(e))})),(0,g.jsx)("li",{className:"pagination-item ".concat(t==o&&"disabled"),onClick:function(){a(t+1)},children:(0,g.jsx)("div",{className:"arrow right"})})]})},S=s(8614),Z=(0,i.lazy)((function(){return Promise.all([s.e(916),s.e(136)]).then(s.bind(s,5850))})),P=function(e){var a,s,c,l=e.setGameDetails,o=e.game,u=e.closeSearchResults,m=e.currentGameOpen,y=e.openGame,k=e.closeGameWindow,C=e.addGameHandler,P=localStorage.getItem("twitch_auth"),E=JSON.parse(localStorage.getItem("searches")),O=(0,_.TH)(),R=(0,i.useState)(1),I=(0,t.Z)(R,2),G=I[0],D=I[1],z=(0,i.useState)(E),M=(0,t.Z)(z,2),T=(M[0],M[1]),A=(0,i.useState)(""),B=(0,t.Z)(A,2),F=B[0],J=B[1],X=(0,i.useState)(!1),H=(0,t.Z)(X,2),K=H[0],L=H[1],U=(0,v.lr)(),W=(0,t.Z)(U,1)[0],q=O.state.name,Q=(0,i.useState)(q),V=(0,t.Z)(Q,2),Y=V[0],$=V[1],ee=(0,i.useState)([]),ae=(0,t.Z)(ee,2),se=ae[0],re=ae[1],ne=(0,i.useState)(!1),te=(0,t.Z)(ne,2),ie=te[0],ce=te[1],le=(0,i.useState)(!1),oe=(0,t.Z)(le,2),ue=oe[0],de=oe[1],me=W.get("name"),he=(0,i.useMemo)((function(){var e=13*(G-1),a=e+13;return se.slice(e,a)}),[G,se]),ge=function(){var e=(0,n.Z)((0,r.Z)().mark((function e(a){var s,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,de(!0),ce(!1),s=a.replace("Poke","Pok\xe9"),e.next=6,h().post("".concat("https://gameflixx.netlify.app","/app/search_game"),{token:P,gameName:s});case 6:return n=e.sent,re(n.data),D(1),""!==q&&(E?(E.push(q),T(E),localStorage.setItem("searches",JSON.stringify(E))):(localStorage.setItem("searches",JSON.stringify([q])),T(E))),de(!1),ce(!0),e.abrupt("return",se);case 15:e.prev=15,e.t0=e.catch(0),de(!1),ce(!0),console.log(e.t0);case 20:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(a){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){""!=me&&(window.scrollTo(0,0),ge(me))}),[me]);var pe=function(e){"Enter"===e.key&&ge(Y)},_e=function(e,a){e.stopPropagation(),J(a),y(a)};return o&&(g.Fragment,S.default),ue&&!ie?(0,g.jsxs)("div",{className:"search_results",children:[(0,g.jsxs)("div",{className:"search_results__nav",children:[(0,g.jsx)("span",{onClick:u,children:"X"}),(0,g.jsx)("div",{className:"search_results__nav_search",children:(0,g.jsx)("input",{placeholder:"".concat(""!==q?q:"Search..."),value:Y,onKeyDown:pe,onChange:function(e){return $(e.target.value)}})})]}),(0,g.jsxs)("div",{className:"search_results__container_skeleton",children:[(0,g.jsxs)("div",{className:"top_results_row_skeleton",children:[(0,g.jsx)("h2",{children:"Top Results"}),(0,g.jsx)(p,{count:3,type:"full"})]}),(0,g.jsxs)("div",{className:"remainder_results_skeleton",children:[(0,g.jsx)("h2",{children:"Results"}),(0,g.jsx)(p,{count:9})]})]})]}):(0,g.jsxs)("div",{className:"search_results",children:[(0,g.jsxs)("div",{className:"search_results__nav",children:[(0,g.jsx)("span",{onClick:u,children:"X"}),(0,g.jsxs)("div",{className:"search_results__nav_search",children:[(0,g.jsx)("input",{value:Y,onChange:function(e){return $(e.target.value)},placeholder:"Search..",onKeyDown:pe}),(0,g.jsx)(f.U41,{className:"search_results__nav_search_icon",onClick:pe})]})]}),(0,g.jsxs)("div",{className:"search_results__container",children:[m===F.id&&(0,g.jsxs)("div",{className:"search_results__game_preview",children:[(0,g.jsx)("h1",{onClick:k,children:"X"}),(0,g.jsx)(i.Suspense,{fallback:(0,g.jsx)(g.Fragment,{children:"..."}),children:(0,g.jsx)(Z,{style:{top:"230px"},game:F,gameCover:"https://images.igdb.com/igdb/image/upload/t_1080p_2x/".concat(null===(a=F.cover)||void 0===a?void 0:a.image_id,".jpg"),ratingImage:function(e){if(!e||!e.age_ratings)return(0,g.jsx)("img",{className:"row__poster__esrb_img",src:N});var a=null===e||void 0===e?void 0:e.age_ratings.filter((function(e){return 1==e.category||2==e.category}));if(0==a.length||!e.age_ratings)return(0,g.jsx)("img",{className:"row__poster__esrb_img",src:N});switch(a[0].rating){case 1:case 2:case 8:case 9:return(0,g.jsx)("img",{className:"row__poster__esrb_img",src:x});case 3:case 4:case 10:return(0,g.jsx)("img",{className:"row__poster__esrb_img",src:j});case 5:case 11:return(0,g.jsx)("img",{className:"row__poster__esrb_img",src:b});default:return(0,g.jsx)("img",{className:"row__poster__esrb_img",src:N})}}(F),addGame:C,displayDetails:l,hideDetails:k,fetchGameDetails:function(e){l(e)},viewingPreview:K,openGame:function(){return L(!0)},closeGame:function(){return L(!1)}})})]}),0==se.length&&(0,g.jsx)("div",{className:"search_results__error",children:(0,g.jsx)("p",{children:"Sorry, no results for current game, please refine your search and try again!"})}),he.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("h2",{children:"Top Results"}),(0,g.jsx)("div",{className:"top_results_row",children:null===(s=se.slice(0,3))||void 0===s?void 0:s.map((function(e){var a,s,r,n;return(0,g.jsxs)("div",{className:"top_result_container",onClick:function(){return l(e)},children:[(0,g.jsxs)("div",{className:"top_result_upper",children:[(0,g.jsx)("div",{className:"result_publisher",onClick:function(a){return _e(a,e)},children:(0,g.jsx)("h3",{children:"3D"})}),(0,g.jsx)("img",{src:"https://images.igdb.com/igdb/image/upload/t_screenshot_big/".concat(e.artworks?null===(a=e.artworks[0])||void 0===a?void 0:a.image_id:null===(s=e.cover)||void 0===s?void 0:s.image_id,".jpg")})]}),(0,g.jsxs)("div",{className:"top_result_lower",children:[(0,g.jsx)("h3",{className:"game_name",children:e.name||(0,g.jsx)(d,{count:1})}),(0,g.jsx)("ul",{className:"game_theme_list",children:null===(r=e.themes)||void 0===r?void 0:r.map((function(e){return"Sandbox"!==e.name&&(0,g.jsx)("li",{children:e.name},e.id)}))})]}),(0,g.jsx)("div",{className:"game_cover",style:{backgroundSize:"100% 100%",backgroundImage:"url(https://images.igdb.com/igdb/image/upload/t_cover_big/".concat(null===(n=e.cover)||void 0===n?void 0:n.image_id,".jpg)"),backgroundPosition:"center"}})]},e.id)}))})]}),he.length>3&&(0,g.jsxs)("div",{className:"remainder_results",children:[(0,g.jsx)("h2",{children:"Results"}),null===(c=he.slice(3))||void 0===c?void 0:c.map((function(e){var a;return void 0!==e.cover&&(0,g.jsxs)("div",{className:"results_container",onClick:function(){return l(e)},children:[(0,g.jsx)("div",{className:"remainder_3d",onClick:function(a){return _e(a,e)},children:(0,g.jsx)("h3",{children:"3D"})}),(0,g.jsx)("div",{className:"results_container_img",style:{backgroundSize:"100% 105%",backgroundImage:"url(//images.igdb.com/igdb/image/upload/t_cover_big/".concat(e.cover.image_id,".jpg)"),backgroundPosition:"center"}}),(0,g.jsxs)("div",{className:"results_container_content",children:[(0,g.jsx)("h3",{className:"game_name_remainder",children:e.name}),(0,g.jsx)("ul",{className:"game_theme_list_lower",children:null===(a=e.themes)||void 0===a?void 0:a.map((function(e,a){return"Sandbox"!==e.name&&a<3&&(0,g.jsx)("li",{children:e.name},e.id)}))})]})]},e.id)}))]}),(0,g.jsx)(w,{className:"pagination-bar",currentPage:G,totalCount:se.length-3,pageSize:13,onPageChange:function(e){return D(e)}})]})]})}},3676:function(e,a,s){e.exports=s.p+"static/media/ESRB_E.9cf6d7f3f8e673367d2a.png"},3224:function(e,a,s){e.exports=s.p+"static/media/ESRB_M.37c27952605b5ceea210.png"},1879:function(e,a,s){e.exports=s.p+"static/media/ESRB_RP.7e329028594a72ed21ee.png"},1784:function(e,a,s){e.exports=s.p+"static/media/ESRB_T.5f77aabf3318dacd4cfc.png"}}]);
//# sourceMappingURL=398.14165f40.chunk.js.map
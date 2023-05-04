"use strict";(self.webpackChunkgameflix=self.webpackChunkgameflix||[]).push([[117,858],{9772:function(e,a,n){n.r(a),n.d(a,{default:function(){return Z}});n(7762);var r=n(4165),s=n(5861),t=n(9439),i=n(2791),c=n(1413);function l(e,a){if(null==e)return{};var n,r,s=function(e,a){if(null==e)return{};var n,r,s={},t=Object.keys(e);for(r=0;r<t.length;r++)n=t[r],a.indexOf(n)>=0||(s[n]=e[n]);return s}(e,a);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);for(r=0;r<t.length;r++)n=t[r],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var o=["count","wrapper","className","containerClassName","containerTestId","circle","style"],u=i.createContext({});function d(e){for(var a,n,r,s=e.count,d=void 0===s?1:s,m=e.wrapper,h=e.className,g=e.containerClassName,p=e.containerTestId,_=e.circle,f=void 0!==_&&_,v=e.style,x=l(e,o),j=i.useContext(u),N=(0,c.Z)({},x),b=0,y=Object.entries(x);b<y.length;b++){var C=(0,t.Z)(y[b],2),k=C[0];"undefined"===typeof C[1]&&delete N[k]}var w=(0,c.Z)((0,c.Z)((0,c.Z)({},j),N),{},{circle:f}),S=(0,c.Z)((0,c.Z)({},v),function(e){var a=e.baseColor,n=e.highlightColor,r=e.width,s=e.height,t=e.borderRadius,i=e.circle,c=e.direction,l=e.duration,o=e.enableAnimation,u=void 0===o||o,d={};return"rtl"===c&&(d["--animation-direction"]="reverse"),"number"===typeof l&&(d["--animation-duration"]="".concat(l,"s")),u||(d["--pseudo-element-display"]="none"),"string"!==typeof r&&"number"!==typeof r||(d.width=r),"string"!==typeof s&&"number"!==typeof s||(d.height=s),"string"!==typeof t&&"number"!==typeof t||(d.borderRadius=t),i&&(d.borderRadius="50%"),"undefined"!==typeof a&&(d["--base-color"]=a),"undefined"!==typeof n&&(d["--highlight-color"]=n),d}(w)),Z="react-loading-skeleton";h&&(Z+=" ".concat(h));for(var P=null!==(a=w.inline)&&void 0!==a&&a,E=[],O=Math.ceil(d),R=0;R<O;R++){var I=S;if(O>d&&R===O-1){var T=null!==(n=I.width)&&void 0!==n?n:"100%",z=d%1,D="number"===typeof T?T*z:"calc(".concat(T," * ").concat(z,")");I=(0,c.Z)((0,c.Z)({},I),{},{width:D})}var G=i.createElement("span",{className:Z,style:I,key:R},"\u200c");P?E.push(G):E.push(i.createElement(i.Fragment,{key:R},G,i.createElement("br",null)))}return i.createElement("span",{className:g,"data-testid":p,"aria-live":"polite","aria-busy":null===(r=w.enableAnimation)||void 0===r||r},m?E.map((function(e,a){return i.createElement(m,{key:a},e)})):E)}var m=n(4569),h=n.n(m),g=n(184),p=function(e){var a=e.count;return"full"==e.type?(0,g.jsx)("section",{className:"skeleton_card_wrapper",children:(0,g.jsx)("ul",{className:"list",children:Array(a).fill().map((function(e,a){return(0,g.jsxs)("li",{className:"card",children:[(0,g.jsx)(d,{height:180,className:"card_banner",highlightColor:"#323232"}),(0,g.jsxs)("h4",{className:"card-title",children:[(0,g.jsx)(d,{className:"card_cover",baseCover:"rgb(35, 35, 35)",highlightColor:"#222222",circle:!1})," ","\xa0",(0,g.jsx)(d,{className:"skeleton_title",highlightColor:"#222222",baseCover:"rgb(35, 35, 35)"})]}),(0,g.jsx)("p",{children:(0,g.jsx)(d,{style:{marginLeft:"10px"},className:"card-channel",width:"60%",highlightColor:"#222222"})}),(0,g.jsx)("div",{children:(0,g.jsx)(d,{style:{marginLeft:"10px"},className:"card-metrics",width:"90%",highlightColor:"#222222"})})]},a)}))})}):(0,g.jsx)("section",{className:"skeleton_card_wrapper",children:(0,g.jsx)("ul",{className:"list_small",children:Array(a).fill().map((function(e,a){return(0,g.jsxs)("li",{className:"card_small",children:[(0,g.jsx)(d,{height:104,className:"card_banner_small",highlightColor:"#222222",enableAnimation:!1}),(0,g.jsxs)("h4",{className:"card-title_small",children:[(0,g.jsx)(d,{className:"card_cover_small",circle:!1,highlightColor:"#222222"})," ","\xa0",(0,g.jsx)(d,{className:"skeleton_title_small",highlightColor:"#222222"})]})]},a)}))})})},_=n(7689),f=n(6355),v=n(3676),x=n(1784),j=n(3224),N=n(1879),b=n(3433),y="...",C=function(e,a){var n=a-e+1;return Array.from({length:n},(function(a,n){return n+e}))},k=function(e){var a=e.onPageChange,n=e.totalCount,r=e.siblingCount,s=void 0===r?1:r,t=e.currentPage,c=e.pageSize,l=(e.className,function(e){var a=e.totalCount,n=e.pageSize,r=e.siblingCount,s=void 0===r?1:r,t=e.currentPage;return(0,i.useMemo)((function(){var e=Math.ceil(a/n);if(s+5>=e)return C(1,e);var r=Math.max(t-s,1),i=Math.min(t+s,e),c=r>2,l=i<e-2,o=1,u=e;if(!c&&l){var d=C(1,3+2*s);return[].concat((0,b.Z)(d),[y,e])}if(c&&!l){var m=C(e-(3+2*s)+1,e);return[o,y].concat((0,b.Z)(m))}if(c&&l){var h=C(r,i);return[o,y].concat((0,b.Z)(h),[y,u])}}),[a,n,s,t])}({currentPage:t,totalCount:n,siblingCount:s,pageSize:c}));if(0===t||l.length<2)return null;var o=l[l.length-1];return(0,g.jsxs)("ul",{className:"pagination-container",children:[(0,g.jsx)("li",{className:"pagination-item ".concat(1===t&&"disabled"),onClick:function(){a(t-1)},children:(0,g.jsx)("div",{className:"arrow left"})}),l.map((function(e){return e===y?(0,g.jsx)("li",{className:"pagination-item dots",children:"..."},"dots ".concat(e)):(0,g.jsx)("li",{className:"pagination-item ".concat(e===t&&"selected"),onClick:function(){return a(e)},children:e},"number ".concat(e))})),(0,g.jsx)("li",{className:"pagination-item ".concat(t==o&&"disabled"),onClick:function(){a(t+1)},children:(0,g.jsx)("div",{className:"arrow right"})})]})},w=n(6818),S=(0,i.lazy)((function(){return Promise.all([n.e(101),n.e(916),n.e(332)]).then(n.bind(n,5850))})),Z=function(e){var a,n,c,l=e.closeSearchResults,o=e.currentGameOpen,u=e.openGame,m=e.closeGameWindow,b=e.updateGameStatus,y=e.setNotification,C=e.currentProfile,Z=e.currentCollection,P=localStorage.getItem("twitch_auth"),E=JSON.parse(localStorage.getItem("searches")),O=(0,_.TH)(),R=(0,i.useState)(1),I=(0,t.Z)(R,2),T=I[0],z=I[1],D=(0,i.useState)(E),G=(0,t.Z)(D,2),M=(G[0],G[1]),A=(0,i.useState)(null),B=(0,t.Z)(A,2),F=B[0],J=B[1],X=(0,i.useState)(""),K=(0,t.Z)(X,2),L=K[0],H=K[1],U=(0,i.useState)(!1),W=(0,t.Z)(U,2),q=W[0],Q=W[1],V=O.state.name,Y=(0,i.useState)(V),$=(0,t.Z)(Y,2),ee=$[0],ae=$[1],ne=(0,i.useState)([]),re=(0,t.Z)(ne,2),se=re[0],te=re[1],ie=(0,i.useState)(!1),ce=(0,t.Z)(ie,2),le=ce[0],oe=ce[1],ue=(0,i.useState)(!1),de=(0,t.Z)(ue,2),me=de[0],he=de[1],ge=(0,i.useMemo)((function(){var e=13*(T-1),a=e+13;return se.slice(e,a)}),[T,se]),pe=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(a){var n,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,he(!0),oe(!1),n=a.replace("Poke","Pok\xe9"),e.next=6,h().post("".concat("https://gameflix.up.railway.app","/app/search_game"),{token:P,gameName:n});case 6:return s=e.sent,te(s.data),z(1),""!==V&&(E?(E.push(V),M(E),localStorage.setItem("searches",JSON.stringify(E))):(localStorage.setItem("searches",JSON.stringify([V])),M(E))),he(!1),oe(!0),e.abrupt("return",se);case 15:e.prev=15,e.t0=e.catch(0),he(!1),oe(!0),console.log(e.t0);case 20:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(a){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){""!=V&&(window.scrollTo(0,0),pe(V))}),[V]);var _e=function(e){"Enter"===e.key&&pe(ee)},fe=function(e,a){e.stopPropagation(),H(a),u(a)},ve=function(e){console.log(e),J(e)};return F?(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(w.default,{setNotification:y,game:F,closeDetails:function(){return J(null)},twitchToken:P,updateGameStatus:b,activeProfile:C,currentCollection:Z})}):me&&!le?(0,g.jsxs)("div",{className:"search_results",children:[(0,g.jsxs)("div",{className:"search_results__nav",children:[(0,g.jsx)("span",{onClick:l,children:"X"}),(0,g.jsx)("div",{className:"search_results__nav_search",children:(0,g.jsx)("input",{placeholder:"".concat(""!==V?V:"Search..."),value:ee,onKeyDown:_e,onChange:function(e){return ae(e.target.value)}})})]}),(0,g.jsxs)("div",{className:"search_results__container_skeleton",children:[(0,g.jsxs)("div",{className:"top_results_row_skeleton",children:[(0,g.jsx)("h2",{children:"Top Results"}),(0,g.jsx)(p,{count:3,type:"full"})]}),(0,g.jsxs)("div",{className:"remainder_results_skeleton",children:[(0,g.jsx)("h2",{children:"Results"}),(0,g.jsx)(p,{count:9})]})]})]}):(0,g.jsxs)("div",{className:"search_results",children:[(0,g.jsxs)("div",{className:"search_results__nav",children:[(0,g.jsx)("span",{onClick:l,children:"X"}),(0,g.jsxs)("div",{className:"search_results__nav_search",children:[(0,g.jsx)("input",{value:ee,onChange:function(e){return ae(e.target.value)},placeholder:"Search..",onKeyDown:_e}),(0,g.jsx)(f.U41,{className:"search_results__nav_search_icon",onClick:_e})]})]}),(0,g.jsxs)("div",{className:"search_results__container",children:[o===L.id&&(0,g.jsxs)("div",{className:"search_results__game_preview",children:[(0,g.jsx)("h1",{onClick:m,children:"X"}),(0,g.jsx)(i.Suspense,{fallback:(0,g.jsx)(g.Fragment,{children:"..."}),children:(0,g.jsx)(S,{style:{top:"230px"},game:L,gameCover:"https://images.igdb.com/igdb/image/upload/t_1080p_2x/".concat(null===(a=L.cover)||void 0===a?void 0:a.image_id,".jpg"),ratingImage:function(e){if(!e||!e.age_ratings)return(0,g.jsx)("img",{className:"row__poster__esrb_img",src:N});var a=null===e||void 0===e?void 0:e.age_ratings.filter((function(e){return 1==e.category||2==e.category}));if(0==a.length||!e.age_ratings)return(0,g.jsx)("img",{className:"row__poster__esrb_img",src:N});switch(a[0].rating){case 1:case 2:case 8:case 9:return(0,g.jsx)("img",{className:"row__poster__esrb_img",src:v});case 3:case 4:case 10:return(0,g.jsx)("img",{className:"row__poster__esrb_img",src:x});case 5:case 11:return(0,g.jsx)("img",{className:"row__poster__esrb_img",src:j});default:return(0,g.jsx)("img",{className:"row__poster__esrb_img",src:N})}}(L),displayDetails:J,hideDetails:m,viewingPreview:q,openGame:function(){return Q(!0)},closeGame:function(){return Q(!1)}})})]}),0==se.length&&le&&(0,g.jsx)("div",{className:"search_results__error",children:(0,g.jsx)("p",{children:"Sorry, no results for current game, please refine your search and try again!"})}),ge.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("h2",{children:"Top Results"}),(0,g.jsx)("div",{className:"top_results_row",children:null===(n=se.slice(0,3))||void 0===n?void 0:n.map((function(e){var a,n,r,s;return(0,g.jsxs)("div",{className:"top_result_container",onClick:function(){return ve(e)},children:[(0,g.jsxs)("div",{className:"top_result_upper",children:[(0,g.jsx)("div",{className:"result_publisher",onClick:function(a){return fe(a,e)},children:(0,g.jsx)("h3",{children:"3D"})}),(0,g.jsx)("img",{src:"https://images.igdb.com/igdb/image/upload/t_screenshot_big/".concat(e.artworks?null===(a=e.artworks[0])||void 0===a?void 0:a.image_id:null===(n=e.cover)||void 0===n?void 0:n.image_id,".jpg")})]}),(0,g.jsxs)("div",{className:"top_result_lower",children:[(0,g.jsx)("h3",{className:"game_name",children:e.name||(0,g.jsx)(d,{count:1})}),(0,g.jsx)("ul",{className:"game_theme_list",children:null===(r=e.themes)||void 0===r?void 0:r.map((function(e){return"Sandbox"!==e.name&&(0,g.jsx)("li",{children:e.name},e.id)}))})]}),(0,g.jsx)("div",{className:"game_cover",style:{backgroundSize:"100% 100%",backgroundImage:"url(https://images.igdb.com/igdb/image/upload/t_cover_big/".concat(null===(s=e.cover)||void 0===s?void 0:s.image_id,".jpg)"),backgroundPosition:"center"}})]},e.id)}))})]}),ge.length>3&&(0,g.jsxs)("div",{className:"remainder_results",children:[(0,g.jsx)("h2",{children:"Results"}),null===(c=ge.slice(3))||void 0===c?void 0:c.map((function(e){var a;return void 0!==e.cover&&(0,g.jsxs)("div",{className:"results_container",onClick:function(){return ve(e)},children:[(0,g.jsx)("div",{className:"remainder_3d",onClick:function(a){return fe(a,e)},children:(0,g.jsx)("h3",{children:"3D"})}),(0,g.jsx)("div",{className:"results_container_img",style:{backgroundSize:"100% 105%",backgroundImage:"url(//images.igdb.com/igdb/image/upload/t_cover_big/".concat(e.cover.image_id,".jpg)"),backgroundPosition:"center"}}),(0,g.jsxs)("div",{className:"results_container_content",children:[(0,g.jsx)("h3",{className:"game_name_remainder",children:e.name}),(0,g.jsx)("ul",{className:"game_theme_list_lower",children:null===(a=e.themes)||void 0===a?void 0:a.map((function(e,a){return"Sandbox"!==e.name&&a<3&&(0,g.jsx)("li",{children:e.name},e.id)}))})]})]},e.id)}))]}),(0,g.jsx)(k,{className:"pagination-bar",currentPage:T,totalCount:se.length-3,pageSize:13,onPageChange:function(e){return z(e)}})]})]})}},3676:function(e,a,n){e.exports=n.p+"static/media/ESRB_E.9cf6d7f3f8e673367d2a.png"},3224:function(e,a,n){e.exports=n.p+"static/media/ESRB_M.37c27952605b5ceea210.png"},1879:function(e,a,n){e.exports=n.p+"static/media/ESRB_RP.7e329028594a72ed21ee.png"},1784:function(e,a,n){e.exports=n.p+"static/media/ESRB_T.5f77aabf3318dacd4cfc.png"}}]);
//# sourceMappingURL=117.6603285a.chunk.js.map
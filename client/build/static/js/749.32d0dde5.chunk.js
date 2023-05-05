"use strict";(self.webpackChunkgameflix=self.webpackChunkgameflix||[]).push([[749],{4749:function(e,n,t){t.r(n),t.d(n,{default:function(){return f}});var r=t(4165),a=t(5861),s=t(9439),u=t(2791),c=t(7689),i=t(184),o=function(e){var n,t,c,o,l=e.toLanding,p=e.authenticateUser,d=e.images,f=(0,u.useState)(!1),m=(0,s.Z)(f,2),g=m[0],v=m[1],h=(0,u.useState)(!1),_=(0,s.Z)(h,2),x=_[0],j=_[1],w=(0,u.useState)(null),b=(0,s.Z)(w,2),Z=b[0],N=b[1],k=(0,u.useState)(""),S=(0,s.Z)(k,2),y=S[0],C=S[1],L=(0,u.useState)(!1),F=(0,s.Z)(L,2),D=F[0],I=F[1],E=(0,u.useState)(!1),R=(0,s.Z)(E,2),z=R[0],A=R[1],B=(0,u.useRef)(0);document.body.style.overflow="hidden";var P=function(){B.current+=1,100==B.current&&A(!0)},U=(0,u.useRef)(""),$=(0,u.useRef)(""),q=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,G=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){var t,a,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),I(!0),t=U.current.value,a=$.current.value,U.current.blur(),$.current.blur(),N(""),e.next=9,p(t,a);case 9:(s=e.sent).data||C(s),I(!1);case 12:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,i.jsxs)("div",{className:"login__wrapper",children:[(0,i.jsx)("div",{className:"login",children:(0,i.jsx)("div",{className:"login__form_wrapper",children:(0,i.jsx)("div",{className:"login__form_container",children:(0,i.jsx)("form",{className:"login__form",onSubmit:G,children:D?(0,i.jsx)("div",{className:"login__loading",children:(0,i.jsx)("div",{className:"loading_spinner"})}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h1",{children:"Sign In"}),(0,i.jsxs)("div",{className:"login__form_actions",children:[(0,i.jsx)("label",{className:"form_label",htmlFor:"email"}),(0,i.jsx)("input",{ref:U,onFocus:function(){return N("email")},onChange:function(e){g&&v(!1);var n=e.target.value.trim().toLowerCase();q.test(n)},onBlur:function(e){var n=e.target.value.trim().toLowerCase(),t=q.test(n);v(!t),N(null)},className:"form_input ".concat(""!==(null===(n=U.current)||void 0===n?void 0:n.value)&&g?"error":""),type:"email"}),(0,i.jsx)("span",{className:"form_actions_placeholder ".concat(null!==(t=U.current)&&void 0!==t&&t.value||"email"==Z?"focused":""),children:"Email"})]}),(0,i.jsxs)("div",{className:"login__form_actions",children:[(0,i.jsx)("label",{className:"form_label",htmlFor:"email"}),(0,i.jsx)("input",{ref:$,onFocus:function(){return N("password")},onChange:function(e){x&&j(!1);e.target.value.trim().toLowerCase(),e.target.value.length>0&&e.target.value.length},onBlur:function(e){var n=e.target.value.trim().toLowerCase(),t=n.length>3&&n.length<=8;j(!t),N(null)},className:"form_input ".concat(void 0!==(null===(c=$.current)||void 0===c?void 0:c.value)&&x&&$.current.value.length>0?"error":""),type:"password"}),(0,i.jsx)("span",{className:"form_actions_placeholder ".concat(null!==(o=$.current)&&void 0!==o&&o.value||"password"==Z?"password_focused":""),children:"Password"}),y&&(0,i.jsx)("p",{className:"login__auth_error",children:y})]}),(0,i.jsx)("button",{className:"form__submit_btn",children:"Sign In"}),(0,i.jsxs)("p",{className:"form__create_account",children:["Don't have an account?"," ",(0,i.jsx)("span",{onClick:function(){l()},children:"Create one now"}),"."]})]})})})})}),(0,i.jsx)("div",{className:"login__background",style:{display:z?"":"none"},children:d.map((function(e){return(0,i.jsx)(u.Fragment,{children:(0,i.jsx)("img",{className:"login__img",alt:e.name,src:e.props.children.props.src,onLoad:P})},e.key)}))})]})},l=t(4569),p=t.n(l);var d=(0,u.lazy)((function(){return Promise.all([t.e(355),t.e(257),t.e(112),t.e(865)]).then(t.bind(t,5558))})),f=function(e){var n=e.onLogin,t=function(){var e=localStorage.getItem("twitch_auth"),n=(0,u.useState)([]),t=(0,s.Z)(n,2),c=t[0],i=t[1],o="https://gameflix.up.railway.app",l=new Date;(0,u.useEffect)((function(){var n=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var n,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p().get("".concat(o,"/authentication/login_banner"));case 2:if(n=e.sent,a=new Date(n.data.last_updated),!(l>a.setDate(a.getDate()+7))){e.next=9;break}return t(),e.abrupt("return");case 9:return i(n.data.popular_games_list),e.abrupt("return");case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();n();var t=function(){var n=(0,a.Z)((0,r.Z)().mark((function n(){var t;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e){n.next=2;break}return n.abrupt("return");case 2:return n.prev=2,n.next=5,p().post("".concat(o,"/app/popular_titles"),{token:e});case 5:return t=n.sent,n.abrupt("return",d(t.data));case 9:return n.prev=9,n.t0=n.catch(2),console.log(n.t0),n.abrupt("return",n.t0);case 13:case"end":return n.stop()}}),n,null,[[2,9]])})));return function(){return n.apply(this,arguments)}}()}),[e]);var d=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p().post("".concat(o,"/authentication/update_login_banner"),{gameList:n,date:new Date});case 2:t=e.sent,i(t.data.popular_games_list);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return c}(),l=(0,u.useState)(!0),f=(0,s.Z)(l,2),m=(f[0],f[1]),g=(0,u.useState)(!1),v=(0,s.Z)(g,2),h=v[0],_=v[1],x=localStorage.getItem("user"),j=(0,c.s0)(),w=(0,u.useRef)(0);(0,u.useEffect)((function(){x&&j("/")}),[]),(0,u.useEffect)((function(){}));var b=function(){w.current+=1,w.current>=t.length&&m(!1)},Z=null===t||void 0===t?void 0:t.map((function(e){return(0,i.jsx)(u.Fragment,{children:(0,i.jsx)("img",{className:"login__img",src:"//images.igdb.com/igdb/image/upload/t_cover_big_2x/".concat(e.cover.image_id,".jpg"),onLoad:b})},e.id)})),N=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t,a){var s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p().post("".concat("https://gameflix.up.railway.app","/authentication/signin"),{email:t,password:a});case 3:return s=e.sent,n(s.data.user),e.abrupt("return",s);case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",e.t0.response.data.message);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(n,t){return e.apply(this,arguments)}}();return 100!=Z.length||x?(0,i.jsx)("div",{className:"auth_login__loading",children:(0,i.jsx)("div",{className:"auth_loading_spinner"})}):h?(0,i.jsx)(u.Suspense,{fallback:(0,i.jsx)(i.Fragment,{children:"..."}),children:(0,i.jsx)(d,{toSignIn:function(){_(!1)},images:Z})}):(0,i.jsx)(o,{images:Z,toLanding:function(){return _(!0)},authenticateUser:function(e,n){return N(e,n)}})}}}]);
//# sourceMappingURL=749.32d0dde5.chunk.js.map
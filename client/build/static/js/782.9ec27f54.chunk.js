"use strict";(self.webpackChunkgameflix=self.webpackChunkgameflix||[]).push([[782],{6797:function(e,n,t){t.d(n,{Z:function(){return p}});var a=t(4165),r=t(5861),s=t(9439),i=t(2791),l=(t(9583),t(184)),c=function(e){var n=e.list,t=e.selectGame;return(0,l.jsx)("div",{className:"search_list_container",children:(0,l.jsx)("ul",{className:"search_list",children:n.slice(0,5).map((function(e){return(0,l.jsxs)("li",{className:"search_list_item",onClick:function(){return t(e)},children:[(0,l.jsx)("img",{className:"item_thumbnail",src:e.cover.url}),(0,l.jsx)("p",{className:"item_title",children:e.name})]})}))})})},o=t(4569),u=t.n(o),d=t(6856),m=t(4257),f=t(6355),p=function(e){document.body.style.overflow="hidden";var n="https://gameflix.up.railway.app",t=e.currentProfile,o=t.isAdmin,p=(0,i.useState)(!1),_=(0,s.Z)(p,2),v=_[0],h=_[1],x=(0,i.useState)(!1),j=(0,s.Z)(x,2),g=j[0],N=j[1],k=localStorage.getItem("profile")||t.name,w=(0,i.useState)(k),b=(0,s.Z)(w,2),C=b[0],S=b[1],Z=(0,i.useRef)(""),y=(0,i.useState)(t.favorite_game),E=(0,s.Z)(y,2),F=E[0],P=E[1],A=(0,i.useState)(0),L=(0,s.Z)(A,2),R=L[0],U=L[1],G=(0,i.useState)(""),M=(0,s.Z)(G,2),I=M[0],T=M[1],z=(0,i.useState)([]),B=(0,s.Z)(z,2),D=B[0],O=B[1],X=(0,i.useRef)(""),H=(0,i.useState)(t.favorite_console),W=(0,s.Z)(H,2),Y=W[0],K=W[1],Q=(0,i.useState)(""),q=(0,s.Z)(Q,2),J=(q[0],q[1]),V=(0,i.useState)(t.avatar),$=(0,s.Z)(V,2),ee=$[0],ne=$[1],te=(0,i.useState)(null),ae=(0,s.Z)(te,2),re=(ae[0],ae[1],(0,i.useRef)("")),se=(0,i.useState)(""),ie=(0,s.Z)(se,2),le=ie[0],ce=ie[1],oe=(0,i.useState)(!1),ue=(0,s.Z)(oe,2),de=ue[0],me=ue[1],fe=(0,i.useState)(!1),pe=(0,s.Z)(fe,2),_e=pe[0],ve=pe[1],he=(0,i.useState)(!1),xe=(0,s.Z)(he,2),je=xe[0],ge=xe[1],Ne=(0,i.useState)(t.color),ke=(0,s.Z)(Ne,2),we=ke[0],be=ke[1],Ce=(0,i.useRef)(""),Se=(0,i.useState)(!1),Ze=(0,s.Z)(Se,2),ye=Ze[0],Ee=Ze[1],Fe=(0,i.useState)(t.favorite_genre),Pe=(0,s.Z)(Fe,2),Ae=Pe[0],Le=Pe[1];(0,i.useEffect)((function(){if(""!=F&&F!=t.favorite_game&&!g){var s=setTimeout((function(){N(!0);var t=function(){var t=(0,r.Z)((0,a.Z)().mark((function t(){var r;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u().post("".concat(n,"/app/search_game"),{gameName:F,token:e.twitchToken});case 2:r=t.sent,O(r.data),N(!1);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),500);return function(){return clearTimeout(s)}}O([])}),[F]),(0,i.useEffect)((function(){var e=function(e){27===e.keyCode&&ge(!1)};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[]),(0,i.useEffect)((function(){function e(e){Ce.current&&!Ce.current.contains(e.target)&&Ee(!1)}return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}),[Ce]);var Re=function(){var s=(0,r.Z)((0,a.Z)().mark((function r(){var s;return(0,a.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return h(!0),a.prev=1,a.next=4,u().delete("".concat(n,"/app/delete_profile"),{data:{email:e.userEmail,name:t.name}});case 4:s=a.sent,e.saveEdit(s.data.response),e.viewAllProfiles(),a.next=13;break;case 9:return a.prev=9,a.t0=a.catch(1),console.log(a.t0),a.abrupt("return",a.t0);case 13:h(!1);case 14:case"end":return a.stop()}}),r,null,[[1,9]])})));return function(){return s.apply(this,arguments)}}(),Ue=function(){var s=(0,r.Z)((0,a.Z)().mark((function r(s,i){var l,c;return(0,a.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(h(!0),(l=new FormData).append("email",e.userEmail),l.append("name",t.name),"file"!=i){a.next=20;break}return l.append("avatar",s.target.files[0]),a.prev=6,a.next=9,u().post("".concat(n,"/app/update_avatar_file"),l);case 9:a.sent,ne(URL.createObjectURL(s.target.files[0])),a.next=17;break;case 13:return a.prev=13,a.t0=a.catch(6),console.log(a.t0),a.abrupt("return",a.t0);case 17:h(!1),a.next=33;break;case 20:return c={email:e.userEmail,name:t.name,avatar:le},a.prev=21,a.next=24,u().post("".concat(n,"/app/update_avatar_link"),c);case 24:a.sent,ne(le),a.next=32;break;case 28:return a.prev=28,a.t1=a.catch(21),console.log(a.t1),a.abrupt("return",a.t1);case 32:h(!1);case 33:case"end":return a.stop()}}),r,null,[[6,13],[21,28]])})));return function(e,n){return s.apply(this,arguments)}}(),Ge=function(){var s=(0,r.Z)((0,a.Z)().mark((function r(s){var i,l;return(0,a.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return s.preventDefault(),h(!0),i={email:e.userEmail,originalName:t.name,newName:C.trim(),newColor:we,favoriteGenre:Ae?Ae.trim():"Action",favoriteGame:F?F.trim():"None",gameId:R,imageURL:I,favoriteConsole:Y?Y.trim():"None",twitchToken:e.twitchToken},a.prev=3,a.next=6,u().post("".concat(n,"/app/update_user_profile"),i);case 6:l=a.sent,localStorage.setItem("user",l.data.response.user.email),localStorage.setItem("profile",l.data.response.profile.name),J(l.data.message),e.saveEdit(l.data.response),e.viewAllProfiles(),a.next=17;break;case 14:a.prev=14,a.t0=a.catch(3),J(a.t0);case 17:h(!1);case 18:case"end":return a.stop()}}),r,null,[[3,14]])})));return function(e){return s.apply(this,arguments)}}();return v?(0,l.jsxs)("div",{className:"profile_edit__container",children:[(0,l.jsx)("div",{className:"profile_edit__header",children:(0,l.jsx)("h3",{children:"GAMEFLIX"})}),(0,l.jsx)("div",{className:"profile_edit__form_wrapper",children:(0,l.jsx)("div",{className:"profile__loading",children:(0,l.jsx)("div",{className:"profile__loading_spinner"})})})]}):(0,l.jsxs)("div",{className:"profile_edit__container",children:[(0,l.jsx)("div",{className:"profile_edit__header",children:(0,l.jsx)("h3",{children:"GAMEFLIX"})}),(0,l.jsxs)("div",{className:"profile_edit__form_wrapper",children:[(0,l.jsx)("h3",{children:!0!==t?"Edit Profile":"Create Profile"}),(0,l.jsxs)("div",{className:"form_container ".concat(_e&&"avatar_select_container"),children:[(0,l.jsxs)("div",{style:{paddingTop:_e&&"10px"},className:"form_avatar_container",children:[(0,l.jsx)("img",{className:"current_avatar ".concat(_e&&"avatar_select"),style:{backgroundColor:we||t.color},src:ee}),!_e&&(0,l.jsx)("span",{className:"current_avatar_edit",onClick:function(){return ve(!0)},children:(0,l.jsx)(d.zmo,{style:{height:"100%"}})})]}),(0,l.jsxs)("div",{className:"form_right",children:[!_e&&(0,l.jsxs)("form",{className:"profile_edit__form",children:[(0,l.jsx)("input",{className:"name_input",onChange:function(e){return S(e.target.value)},value:C,autoFocus:!0}),(0,l.jsx)("p",{children:"Color"}),(0,l.jsx)("input",{className:"color_input",style:{color:we},onChange:function(e){return be(e.target.value)},value:we}),(0,l.jsx)("button",{type:"button",onClick:function(){return ge(!je)},style:{backgroundColor:we}}),je&&(0,l.jsx)(m.xS,{color:we,onChangeComplete:function(e){return be(e.hex)},className:"profile_color_palette"})]}),(0,l.jsxs)("div",{className:"form_personal ".concat(_e&&"personal_avatar"),children:[(0,l.jsx)("h4",{style:{textAlign:_e?"center":"left"},children:_e?"Current":"Your Playstyle"}),_e&&(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:"upload_avatar_actions ".concat(de&&"img_link_actions"),children:[(0,l.jsx)("input",{className:"upload_file_input",type:"file",accept:"image/*",style:{display:"none"},multiple:!1,ref:re,onChange:function(e){return Ue(e,"file")}}),!de&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("button",{onClick:function(){return re.current.click()},children:"Upload"}),(0,l.jsx)("p",{children:"OR"})]}),(0,l.jsx)("button",{onClick:function(e){de?Ue(e,"link"):me(!0)},children:de?"Submit":"Enter link"}),de&&(0,l.jsx)("input",{className:"console_input ".concat(_e&&"img_input"),placeholder:"Enter link to image or gif",value:le,onChange:function(e){return ce(e.target.value)}})]})}),!_e&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("p",{className:"form_personal_title",children:"Favorite Title"}),(0,l.jsx)("input",{ref:Z,value:F,className:"title_input",onBlur:function(){D.length},onChange:function(e){Z.current=F,P(e.target.value)}}),g&&(0,l.jsx)("div",{className:"profile__search_loading",children:(0,l.jsx)("div",{className:"profile__search_loading_spinner"})}),D.length>0&&""!==F&&(0,l.jsx)(c,{list:D,selectGame:function(e){var n;P(e.name),U(e.id),T("//images.igdb.com/igdb/image/upload/t_cover_big/".concat(null===(n=e.cover)||void 0===n?void 0:n.image_id,".jpg")),O([])}})]}),!_e&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("p",{className:"form_personal_console",children:"Favorite Console"}),(0,l.jsx)("input",{ref:Z,value:Y,onChange:function(e){X.current=Y,K(e.target.value)},className:"console_input ".concat(_e&&"img_input"),placeholder:_e?"https://www.example.com":""})]}),(0,l.jsxs)("div",{className:"genre_dropdown",children:[!_e&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("p",{className:"form_personal_genre",children:"Favorite Genre"}),(0,l.jsxs)("button",{onClick:function(){return Ee(!ye)},children:[void 0!==Ae?"".concat(Ae):"Action"," ",(0,l.jsx)(f.iUH,{className:"genre_arrow"})]})]}),ye&&(0,l.jsx)("div",{ref:Ce,className:"genre_dropdown_content",children:["Action","Adventure","Arcade","Card & Board","Family","Fighting","Indie","MMO (Massive Multiplayer)","Platformer","Puzzle","Racing","RPG","Shooter","Sports","Strategy"].map((function(e){return(0,l.jsx)("span",{onClick:function(){return function(e){Le(e),Ee(!1)}(e)},children:e},e)}))})]})]})]})]}),(0,l.jsxs)("div",{className:"form_actions",children:[!_e&&(0,l.jsx)("button",{className:"save_btn",onClick:Ge,children:"Save"}),(0,l.jsx)("button",{className:"cancel_btn",onClick:function(){_e?(ve(!1),me(!1)):e.viewAllProfiles()},children:_e?"Back":"Cancel"}),!o&&(0,l.jsx)("button",{className:"delete_profile_btn justify-start",onClick:Re,children:"Delete Profile"})]})]})]})}},6782:function(e,n,t){t.r(n),t.d(n,{default:function(){return v}});var a=t(9439),r=t(2791),s=t(6475),i=t(6856),l=t(6797),c=t(4165),o=t(5861),u=t(4257),d=t(6355),m=t(4569),f=t.n(m),p=(t(9583),t(184)),_=function(e){var n=(0,r.useState)(!1),t=(0,a.Z)(n,2),i=t[0],l=t[1],m=(0,r.useState)(!1),_=(0,a.Z)(m,2),v=_[0],h=_[1],x=(0,r.useState)(""),j=(0,a.Z)(x,2),g=j[0],N=j[1],k=(0,r.useState)(""),w=(0,a.Z)(k,2),b=w[0],C=w[1],S=(0,r.useState)(!1),Z=(0,a.Z)(S,2),y=Z[0],E=Z[1],F=(0,r.useState)(null),P=(0,a.Z)(F,2),A=(P[0],P[1],(0,r.useState)("")),L=(0,a.Z)(A,2),R=L[0],U=L[1],G=(0,r.useState)(""),M=(0,a.Z)(G,2),I=M[0],T=M[1],z=(0,r.useState)(""),B=(0,a.Z)(z,2),D=B[0],O=B[1],X=(0,r.useState)(null),H=(0,a.Z)(X,2),W=H[0],Y=H[1],K=(0,r.useState)(!0),Q=(0,a.Z)(K,2),q=Q[0],J=Q[1],V=(0,r.useState)(""),$=(0,a.Z)(V,2),ee=$[0],ne=$[1],te=(0,r.useState)(!1),ae=(0,a.Z)(te,2),re=ae[0],se=ae[1],ie=(0,r.useRef)(""),le=(0,r.useRef)(""),ce=(0,r.useState)(!1),oe=(0,a.Z)(ce,2),ue=oe[0],de=oe[1],me=(0,r.useState)(""),fe=(0,a.Z)(me,2),pe=fe[0],_e=fe[1];(0,r.useEffect)((function(){var e=function(e){27===e.keyCode&&h(!1)};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[]),(0,r.useEffect)((function(){function e(e){le.current&&!le.current.contains(e.target)&&de(!1)}return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}),[le]);var ve=function(e,n){"file"==n?Y(URL.createObjectURL(e.target.files[0])):(se(!0),J(!1))},he=function(){var n=(0,o.Z)((0,c.Z)().mark((function n(t){var a,r;return(0,c.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.preventDefault(),l(!0),h(!1),""!=R.trim()){n.next=10;break}return E(!0),C("Please enter a valid name!"),l(!1),n.abrupt("return");case 10:if(""!=I.trim()){n.next=15;break}return E(!0),C("Please enter a valid game console!"),l(!1),n.abrupt("return");case 15:return a={email:e.userEmail,avatar:W,name:R.trim(),color:g,favoriteGenre:pe.trim(),favoriteGame:D.trim(),favoriteConsole:I.trim()},n.prev=16,n.next=19,f().post("".concat("https://gameflix.up.railway.app","/app/create_new_profile"),a);case 19:r=n.sent,localStorage.setItem("user",r.data.response.email),e.updateUser(r.data.response),e.viewAllProfiles(),n.next=28;break;case 25:n.prev=25,n.t0=n.catch(16),console.log(n.t0);case 28:J(!0),l(!1);case 30:case"end":return n.stop()}}),n,null,[[16,25]])})));return function(e){return n.apply(this,arguments)}}();return i?(0,p.jsxs)("div",{className:"profile_edit__container",children:[(0,p.jsx)("div",{className:"profile_edit__header",children:(0,p.jsx)("h3",{children:"GAMEFLIX"})}),(0,p.jsx)("div",{className:"profile_edit__form_wrapper",children:(0,p.jsx)("div",{className:"profile__loading",children:(0,p.jsx)("div",{className:"profile__loading_spinner"})})})]}):(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)("div",{className:"profile_edit__container",children:[(0,p.jsx)("div",{className:"profile_edit__header",children:(0,p.jsx)("h3",{children:"GAMEFLIX"})}),(0,p.jsxs)("div",{className:"profile_edit__form_wrapper",children:[(0,p.jsxs)("div",{className:"avatar_link_modal ".concat(0==re&&0==q&&"modal_hidden"," ").concat(0==re&&1==q&&"avatar_link_modal_launch"),children:[(0,p.jsx)("h3",{children:"Avatar Link"}),(0,p.jsxs)("div",{className:"modal_content",children:[(0,p.jsx)("p",{children:"Please enter the link to any image or gif below."}),(0,p.jsxs)("div",{className:"modal_form",children:[(0,p.jsx)("input",{value:ee,onChange:function(e){return ne(e.target.value)}}),(0,p.jsx)("button",{onClick:function(e){Y(ee),se(!1)},children:"Submit"}),(0,p.jsx)("button",{onClick:function(){return se(!1)},children:"Back"})]})]})]}),(0,p.jsx)("h3",{children:"Create Profile"}),(0,p.jsxs)("div",{className:"form_container",children:[(0,p.jsxs)("div",{className:"form_avatar_container",children:[(0,p.jsx)("img",{style:{backgroundColor:""==g?"#FFF":g,objectFit:"cover"},className:"current_avatar",src:null==W?s:W}),(0,p.jsxs)("div",{className:"profile_avatar_actions",children:[(0,p.jsxs)("span",{className:"avatar_file_option",children:[(0,p.jsx)("input",{className:"upload_file_input",type:"file",accept:"image/*",style:{display:"none"},multiple:!1,ref:ie,onChange:function(e){return ve(e,"file")}}),(0,p.jsx)(d.Qvc,{onClick:function(e){return ie.current.click()}})]}),(0,p.jsx)("span",{className:"avatar_link_option",children:(0,p.jsx)(d.gjK,{onClick:function(e){return ve("link")}})})]})]}),(0,p.jsxs)("div",{className:"form_right",children:[(0,p.jsxs)("form",{className:"profile_edit__form",children:[(0,p.jsx)("input",{className:"name_input",placeholder:"Name",onChange:function(e){U(e.target.value),E(!1)},value:R,autoFocus:!0}),(0,p.jsx)("p",{children:"Color"}),(0,p.jsx)("input",{className:"color_input",style:{color:g,fontWeight:"500"},onChange:function(e){return N(e.target.value)},value:g}),(0,p.jsx)("button",{type:"button",onClick:function(){return h(!v)},style:{backgroundColor:g}}),v&&(0,p.jsx)(u.xS,{color:g,onChangeComplete:function(e){return N(e.hex)},className:"profile_color_palette"})]}),(0,p.jsxs)("div",{className:"form_personal",children:[(0,p.jsx)("h4",{children:"Your Playstyle"}),(0,p.jsx)("p",{className:"form_personal_console",children:"Favorite Console"}),(0,p.jsx)("input",{value:I,onChange:function(e){T(e.target.value)},className:"console_input"}),(0,p.jsx)("p",{className:"form_personal_title",children:"Favorite Title"}),(0,p.jsx)("input",{value:D,className:"title_input",onChange:function(e){O(e.target.value)}}),(0,p.jsxs)("div",{className:"genre_dropdown",children:[(0,p.jsx)("p",{className:"form_personal_genre",children:"Favorite Genre"}),(0,p.jsxs)("button",{onClick:function(){return de(!ue)},children:[""!==pe?"".concat(pe):"Action"," ",(0,p.jsx)(d.iUH,{className:"genre_arrow"})]}),ue&&(0,p.jsx)("div",{ref:le,className:"genre_dropdown_content",children:["Action","Adventure","Arcade","Card & Board","Family","Fighting","Indie","MMO (Massive Multiplayer)","Platformer","Puzzle","Racing","RPG","Shooter","Sports","Strategy"].map((function(e){return(0,p.jsx)("span",{onClick:function(){return function(e){_e(e),de(!1)}(e)},children:e},e)}))})]})]})]})]}),(0,p.jsxs)("div",{className:"form_actions",children:[(0,p.jsx)("button",{className:"save_btn",onClick:he,children:"Save"}),(0,p.jsx)("button",{className:"cancel_btn",onClick:e.viewAllProfiles,children:"Cancel"})]}),y&&(0,p.jsx)("p",{className:"create_profile_error",children:b})]})]})})},v=function(e){var n=(0,r.useState)(!1),t=(0,a.Z)(n,2),c=t[0],o=t[1],u=(0,r.useState)(null),d=(0,a.Z)(u,2),m=d[0],f=d[1],v=(0,r.useState)(null),h=(0,a.Z)(v,2),x=h[0],j=h[1],g=(0,r.useState)(!1),N=(0,a.Z)(g,2),k=(N[0],N[1]),w=(0,r.useRef)(0),b=function(n){c?f(n):function(n){localStorage.setItem("profile",n.name),e.selectProfile(n)}(n)};(0,r.useEffect)((function(){j(e.currentUser.profiles),o(!1)}),[e.currentUser]);var C=null===x||void 0===x?void 0:x.length,S=function(){w.current++,console.log(w.current),w.current==C&&k(!0)};if(null!=x)return null!==m&&"new"!==m?(0,p.jsx)(l.Z,{saveEdit:e.updateUser,currentProfile:m,viewAllProfiles:function(){return f(null)},userEmail:e.currentUser.email,twitchToken:e.twitchToken}):null!==m&&"new"==m?(0,p.jsx)(_,{updateUser:e.updateUser,userEmail:e.currentUser.email,viewAllProfiles:function(){return f(null)}}):(x.sort((function(e,n){return e.isAdmin?-1:n.isAdmin?1:0})),(0,p.jsxs)("div",{className:"profile__page",children:[(0,p.jsx)("div",{className:"profile_edit__header",children:(0,p.jsx)("h3",{children:"GAMEFLIX"})}),(0,p.jsxs)("div",{className:"profile__container",children:[(0,p.jsx)("h3",{children:"Who's gaming?"}),(0,p.jsx)("ul",{className:"profile__list",children:x.map((function(e){return(0,p.jsxs)("li",{className:"profile__user",onClick:function(){return b(e)},children:[(0,p.jsx)("img",{className:"profile__user_avatar ".concat(c&&"editing"),style:{"--color-theme":e.color,backgroundColor:e.color},src:e.avatar?"".concat(e.avatar):s,onLoad:S}),c&&(0,p.jsx)(i.zmo,{className:"edit-icon"}),(0,p.jsx)("span",{className:"profile__user_name",children:e.name})]},e.name)}))}),(0,p.jsxs)("div",{className:"profile__actions",children:[(0,p.jsx)("button",{className:"profile__manage_btn ".concat(c&&"edit_btn"),onClick:function(){return o(!c)},children:c?"Done":"Manage Profiles"}),x.length<5&&(0,p.jsx)("button",{className:"profile__new_btn",onClick:function(){return f("new")},children:"New Profile"})]})]})]}))}},9583:function(){},6475:function(e,n,t){e.exports=t.p+"static/media/basic_avatar.9eeabb71d2fe70b7ff75.png"}}]);
//# sourceMappingURL=782.9ec27f54.chunk.js.map
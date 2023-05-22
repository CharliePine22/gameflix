"use strict";(self.webpackChunkgameflix=self.webpackChunkgameflix||[]).push([[331],{1403:function(e,t,n){n.r(t),n.d(t,{default:function(){return U}});var a=n(4165),s=n(5861),r=n(3433),i=n(9439),o=n(2791),c=n(6355),l=n(458),u=n(4045),d=n(4569),m=n.n(d),h=n(4942),p=n(1413),_=n(3853),f=function(){var e=(0,o.useState)({x:0,y:0}),t=(0,i.Z)(e,2),n=t[0],a=t[1],s=(0,o.useState)(!1),r=(0,i.Z)(s,2),c=r[0],l=r[1],u=(0,o.useState)(!1),d=(0,i.Z)(u,2),m=d[0],h=d[1],p=(0,o.useCallback)((function(e){e.preventDefault(),"user_game_banner_img"!==e.target.className||c||(a({x:e.offsetX,y:e.pageY}),l(!0),h(!1)),"title_list__item"===e.target.className&&(a({x:e.movementX+5,y:e.y+20}),h(!0),l(!1))}),[a]),_=(0,o.useCallback)((function(){m&&h(!1),c&&l(!1)}),[m,c]);return(0,o.useEffect)((function(){return document.addEventListener("click",_),document.addEventListener("contextmenu",p),function(){document.removeEventListener("click",_),document.removeEventListener("contextmenu",p)}})),{anchorPoint:n,showTitleMenu:m,showBannerMenu:c,resetContext:function(){l(!1),h(!1)}}},g=n(8820),x=n(6856),v=n(9126),N=n(184),j=function(e){var t=e.note,n=e.closeNote,a=e.updateNote,s=e.deleteNote,r=(0,o.useState)(t.note),c=(0,i.Z)(r,2),l=c[0],u=c[1];return(0,N.jsxs)("div",{className:"note_details__container",children:[(0,N.jsx)("span",{className:"note_details__date",children:t.date}),(0,N.jsx)(v.And,{className:"note_details__back_icon",onClick:n}),(0,N.jsxs)("div",{className:"note_details__details",children:[(0,N.jsx)("h4",{className:"note_details_note",children:"Note Details"}),(0,N.jsx)("textarea",{value:l,onChange:function(e){return u(e.target.value)},className:"note_details__editor"})]}),(0,N.jsxs)("div",{className:"note_details__actions",children:[(0,N.jsx)("button",{onClick:function(){return a(t,l)},children:"Save Note"}),(0,N.jsx)("button",{onClick:function(){return s(t.note)},children:"Delete Note"})]})]})},y=new Date,b=y.getFullYear(),k=y.getMonth()+1,w=y.getDate();w<10&&(w="0"+w),k<10&&(k="0"+k);var C=k+"/"+w+"/"+b,S=function(e){var t,n,r,l,u,d,m=e.windowViewHandler,h=e.viewStatus,p=e.gameNotes,_=e.updateNotes,f=(0,o.useState)(""),v=(0,i.Z)(f,2),y=v[0],b=v[1],k=(0,o.useState)(!1),w=(0,i.Z)(k,2),S=w[0],Z=w[1],E=(0,o.useState)(""),P=(0,i.Z)(E,2),I=P[0],A=P[1],T=(0,o.useState)(!1),D=(0,i.Z)(T,2),M=D[0],B=D[1],L=(0,o.useState)(!1),U=(0,i.Z)(L,2),O=U[0],G=U[1],F=(0,o.useState)(""),R=(0,i.Z)(F,2),H=R[0],z=R[1],Y=(0,o.useState)(null),K=(0,i.Z)(Y,2),V=K[0],W=K[1],X=null===p||void 0===p||null===(t=p.tabs)||void 0===t?void 0:t.filter((function(e){return e.tabName==y}))[0],Q=(0,o.useRef)(null),q=(0,o.useRef)(null),J=(0,o.useRef)(null);(0,o.useEffect)((function(){var e;p&&b(null===p||void 0===p||null===(e=p.tabs[0])||void 0===e?void 0:e.tabName)}),[p]),(0,o.useEffect)((function(){null===V&&(q.current.focus(),Z(!1),z(""),A(""))}),[q,X]),(0,o.useEffect)((function(){if(O)return Q.current.scrollIntoView({behavior:"smooth"}),G(!1),function(){return clearTimeout($)}}),[O]);var $,ee=function(){if(S){if(""==q.current.innerText||"/n"==q.current.innerText)return console.log("EMPTY"),void(X.tabName="Notes");X.tabName=q.current.innerText,_(),b(q.current.innerText),Z(!1)}else Z(!0)},te=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),""!=I){e.next=3;break}return e.abrupt("return");case 3:p.tabs.push({tabName:I,notes:[]}),b(I),_(),A(""),B(!1);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,N.jsxs)("div",{className:"user_notes__wrapper ".concat(!h.notes&&"minimized_notes"),children:[(0,N.jsx)(c.iUH,{style:{transform:h.notes?"rotate(180deg)":"rotate(0)",display:V&&"none"},className:"user_game__minimize_icon",onClick:function(){return m("notes")}}),V?(0,N.jsx)(j,{note:V,closeNote:function(){return W(null)},updateNote:function(e,t){e.note=t,e.date=C,_(),W(null)},deleteNote:function(e){var t=X.notes.filter((function(t){return t.note!==e}));X.notes=t,_(),W(null)}}):(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)("h4",{contentEditable:S,suppressContentEditableWarning:!0,onBlur:ee,onKeyDown:function(e){e.preventDefault(),console.log(e.currentTarget.innerText),"Enter"===e.key&&ee()},children:[(0,N.jsx)("p",{ref:q,style:{borderBottom:S?"2px solid #9147ff":"2px solid transparent",userSelect:S?"auto":"none",padding:"14px 6px 0",transition:"all 200ms",lineHeight:"28px"},children:y})," ",(0,N.jsx)(x.rnx,{className:"edit_tab_icon",onClick:function(){return Z(!S)}})," "]}),(0,N.jsx)("div",{className:"user_notes__header",children:(0,N.jsxs)("ul",{className:"user_notes__tabs",children:[null===p||void 0===p?void 0:p.tabs.map((function(e){return(0,N.jsx)("li",{className:"user_notes__tab",onClick:function(){return b(e.tabName)},style:{borderBottom:y==e.tabName&&"1px solid transparent"},children:e.tabName},e.tabName)})),(0,N.jsx)("li",{className:"user_notes__tab ".concat(M?"add_tab":"new_tab"),onClick:function(e){e.stopPropagation(),B(!0),$=setTimeout((function(){return J.current.scrollIntoView({behavior:"smooth"})}),150)},children:M?(0,N.jsxs)("div",{className:"new_tab__container",children:[(0,N.jsx)("form",{onSubmit:te,children:(0,N.jsx)("input",{value:I,onChange:function(e){return A(e.target.value)}})}),(0,N.jsx)("p",{onClick:function(e){e.stopPropagation(),B(!1)},children:"X"})]}):(0,N.jsx)(g.Lfi,{})}),(0,N.jsx)("div",{ref:J})]})})]}),(0,N.jsx)("div",{className:"user_notes__notes_wrapper",children:(0,N.jsxs)("ul",{className:"user_notes__notes",children:[(null===p||void 0===p||null===(n=p.tabs)||void 0===n||null===(r=n.filter((function(e){return e.tabName==y}))[0])||void 0===r||null===(l=r.notes)||void 0===l?void 0:l.length)>0?null===p||void 0===p||null===(u=p.tabs)||void 0===u||null===(d=u.filter((function(e){return e.tabName==y}))[0])||void 0===d?void 0:d.notes.map((function(e){return(0,N.jsx)("li",{className:"user_note",onClick:function(){return function(e){W(e),B(!1),Z(!1)}(e)},children:e.note},e.note)})):(0,N.jsx)("p",{className:"no_notes_msg",children:"No Notes"}),(0,N.jsx)("div",{ref:Q,style:{width:"10px",marginLeft:"5px"}})]})}),(0,N.jsx)("div",{className:"user_notes__form_container",style:{display:"".concat(h.notes?"block":"none")},children:(0,N.jsx)("form",{className:"user_notes__form",onSubmit:function(e){e.preventDefault(),""!=H&&(G(!0),X.notes.push({id:X.notes.length+1,note:H,date:C}),_(),z(""))},children:(0,N.jsx)("input",{value:H,onChange:function(e){return z(e.target.value)},className:"user_notes__input",placeholder:"I think Clark Kent is Batman"})})})]})]})},Z=n(4544),E=new Date,P=E.getFullYear(),I=E.getMonth()+1,A=E.getDate();A<10&&(A="0"+A),I<10&&(I="0"+I);var T=I+"/"+A+"/"+P,D=function(e){var t=e.game,n=e.activeProfile,r=e.closeStats,l=e.setCurrentGame,u=e.updateCollection,d=e.userNotes,g=e.spotifyToken,x=e.currentTrack,v=e.playAudio,j=e.pausePlayback,y=e.beginPlayback,b=e.playTrack,k=f(),w=k.anchorPoint,C=k.showBannerMenu,E=k.resetContext,P=(0,o.useState)({achievements:!0,notes:!0,trophies:!0}),I=(0,i.Z)(P,2),A=I[0],D=I[1],M=(0,o.useState)(t.achievements),B=(0,i.Z)(M,2),L=B[0],U=B[1],O=(0,o.useState)(t.trophies),G=(0,i.Z)(O,2),F=G[0],R=G[1],H=(0,o.useState)("unlocked"),z=(0,i.Z)(H,2),Y=z[0],K=z[1],V=(0,o.useState)("unlocked"),W=(0,i.Z)(V,2),X=W[0],Q=W[1],q=(0,o.useState)(null),J=(0,i.Z)(q,2),$=J[0],ee=J[1],te=(0,o.useState)(Math.floor(t.playtime/60)),ne=(0,i.Z)(te,2),ae=ne[0],se=ne[1],re=(0,o.useState)(!1),ie=(0,i.Z)(re,2),oe=ie[0],ce=ie[1],le=(0,o.useState)(t.user_rating),ue=(0,i.Z)(le,2),de=ue[0],me=ue[1],he=(0,o.useState)(!1),pe=(0,i.Z)(he,2),_e=pe[0],fe=pe[1],ge=(0,o.useState)(!1),xe=(0,i.Z)(ge,2),ve=xe[0],Ne=xe[1],je=(0,o.useState)(""),ye=(0,i.Z)(je,2),be=ye[0],ke=ye[1],we=(0,o.useState)(!1),Ce=(0,i.Z)(we,2),Se=Ce[0],Ze=Ce[1],Ee=(0,o.useState)([]),Pe=(0,i.Z)(Ee,2),Ie=Pe[0],Ae=Pe[1],Te=(0,o.useState)(t.status),De=(0,i.Z)(Te,2),Me=De[0],Be=De[1],Le=(0,o.useState)(!1),Ue=(0,i.Z)(Le,2),Oe=Ue[0],Ge=Ue[1],Fe="https://gameflix.up.railway.app",Re=localStorage.getItem("steamID"),He=localStorage.getItem("user"),ze=Math.floor((null===F||void 0===F?void 0:F.filter((function(e){return 1==e.earned})).length)/(null===F||void 0===F?void 0:F.length)*100),Ye=Math.floor((null===L||void 0===L?void 0:L.filter((function(e){return 1==e.achieved||1==e.earned})).length)/(null===L||void 0===L?void 0:L.length)*100),Ke=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var s,r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=d.notes_collection.filter((function(e){return e.id==t.id}))[0]){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,m().put("".concat(Fe,"/notes/update_notes"),{profile:n,gameId:s.id,notes:s,email:He});case 5:return r=e.sent,ee(d.notes_collection.filter((function(e){return e.id==t.id}))[0]),e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,o.useEffect)((function(){d.notes_collection&&0!=d.notes_collection.filter((function(e){return e.id==t.id})).length?ee(d.notes_collection.filter((function(e){return e.id==t.id}))[0]):(0==d.notes_collection.length?(d.notes_collection=[{id:t.id,name:t.name,tabs:[{tabName:"Notes",notes:[{id:0,note:"These are your notes for ".concat(t.name,"! Click me to edit this or start your own tab by clicking the +"),date:T}]}]}],ee({id:t.id,name:t.name,tabs:[{tabName:"Notes",notes:[{id:0,note:"These are your notes for ".concat(t.name,"! Click me to edit this or start your own tab by clicking the +"),date:T}]}]})):(d.notes_collection.push({id:t.id,name:t.name,tabs:[{tabName:"Notes",notes:[{id:0,note:"These are your notes for ".concat(t.name,"! Click me to edit this or start your own tab by clicking the +"),date:T}]}]}),ee({id:t.id,name:t.name,tabs:[{tabName:"Notes",notes:[{id:0,note:"These are your notes for ".concat(t.name,"! Click me to edit this or start your own tab by clicking the +"),date:T}]}]})),Ke())}),[t,d]),(0,o.useEffect)((function(){var e=function(e){27===e.keyCode&&(fe(!1),Ge(!1))};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[]),(0,o.useEffect)((function(){if(Ze(!1),ce(!1),fe(!1),Ge(!1),Be(t.status||"BACKLOG"),se(Math.floor(t.playtime/60)),me(t.user_rating),U(t.achievements),R(t.trophies),Re){var e=function(e,t){var n=[];return t.map((function(t){var a=e.filter((function(e){return e.name==t.displayName}));a.length>0&&(t.achieved=a[0].achieved),n.push(t)})),n.sort((function(e,t){var n=e.displayName.toUpperCase(),a=t.displayName.toUpperCase();return n<a?-1:n>a?1:0})),n.sort((function(e,t){return e.achieved<t.achieved?1:e.achieved>t.achieved?-1:0})),n},r=function(){var r=(0,s.Z)((0,a.Z)().mark((function s(){var r,i,o,c;return(0,a.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,m().get("".concat(Fe,"/steam/get_game_stats"),{params:{gameId:t.id}});case 2:if(r=a.sent,0!=Object.keys(r.data).length){a.next=6;break}return U(null),a.abrupt("return");case 6:if(a.prev=6,t.achievements){a.next=18;break}return a.next=10,m().get("".concat(Fe,"/steam/get_steam_achievements"),{params:{gameId:t.id,steamId:Re}});case 10:return i=a.sent,o=e(i.data.achievements,r.data.availableGameStats.achievements),a.next=14,m().put("".concat(Fe,"/app/update_game_achievements"),{email:He,currentProfile:n.name,achievements:o,gameId:t.id});case 14:c=a.sent,l(i.data.response.game),u(i.data.response.profile.collection),U(c.data.response.game.achievements);case 18:a.next=24;break;case 20:return a.prev=20,a.t0=a.catch(6),console.log(a.t0),a.abrupt("return",a.t0);case 24:case"end":return a.stop()}}),s,null,[[6,20]])})));return function(){return r.apply(this,arguments)}}();r()}else console.log("No steam id")}),[t]);var Ve=function(e){if(!e)return"N/A";var t=e.filter((function(e){return 1==e.achieved||1==e.earned})).length;return t+"/"+e.length};console.log(Ie);var We=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(g){e.next=4;break}return e.abrupt("return",null);case 4:return e.prev=4,e.next=7,m().get("".concat(Fe,"/spotify/spotify_album"),{params:{game:t.name,token:g,baseURL:Fe}});case 7:if("OK"===(n=e.sent).data.status){e.next=13;break}return console.log(n),e.abrupt("return");case 13:return Ae(n.data.tracks),Ze(!0),e.abrupt("return");case 16:e.next=22;break;case 18:return e.prev=18,e.t0=e.catch(4),console.log(e.t0),e.abrupt("return",e.t0);case 22:case"end":return e.stop()}}),e,null,[[4,18]])})));return function(){return e.apply(this,arguments)}}();var Xe=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var s;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m().put("".concat(Fe,"/app/update_game_rating"),{email:He,currentProfile:n.name,rating:de,gameId:t.id});case 3:s=e.sent,localStorage.setItem("profile",s.data.response.profile.name),l(s.data.response.game),u(s.data.response.profile.collection),fe(!1),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}(),Qe=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var s;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.playtime!=ae){e.next=4;break}return e.abrupt("return");case 4:return e.prev=4,e.next=7,m().put("".concat(Fe,"/app/update_game_playtime"),{email:He,currentProfile:n.name,playtime:60*ae,gameId:t.id});case 7:s=e.sent,localStorage.setItem("profile",s.data.response.profile.name),l(s.data.response.game),u(s.data.response.profile.collection),ce(!1),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(4),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[4,14]])})));return function(){return e.apply(this,arguments)}}(),qe=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(s){var r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m().put("".concat(Fe,"/app/update_game_backlog"),{email:He,currentProfile:n.name,status:s,gameId:t.id});case 3:r=e.sent,localStorage.setItem("profile",r.data.response.profile.name),l(r.data.response.game),u(r.data.response.profile.collection),Ge(!1),e.next=14;break;case 10:return e.prev=10,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),Je=function(e){qe(e),Ge(!1)},$e=function(e){D((0,p.Z)((0,p.Z)({},A),{},(0,h.Z)({},e,!A[e])))},et=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var s;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!=be.trim()){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,m().put("".concat(Fe,"/app/update_game_banner"),{email:He,currentProfile:n.name,url:be,gameId:t.id});case 5:return s=e.sent,localStorage.setItem("profile",s.data.response.profile.name),l(s.data.response.game),u(s.data.response.profile.collection),Ne(!1),ke(""),e.abrupt("return",s.data);case 14:return e.prev=14,e.t0=e.catch(2),console.log(e.t0),e.abrupt("return",e.t0);case 18:case"end":return e.stop()}}),e,null,[[2,14]])})));return function(){return e.apply(this,arguments)}}();return(0,N.jsxs)("div",{className:"user_game__wrapper",children:[ve&&(0,N.jsx)("div",{className:"user_game__modal",children:(0,N.jsxs)("div",{className:"modal_content",children:[(0,N.jsx)("h2",{style:{maxWidth:"75%",textAlign:"center",marginBottom:"25px"},children:"Please enter the link to any image or gif below."}),(0,N.jsxs)("div",{className:"modal_form",style:{width:"100%"},children:[(0,N.jsx)("input",{style:{width:"80%"},value:be,onChange:function(e){return ke(e.target.value)}}),(0,N.jsx)("button",{onClick:et,children:"Submit"}),(0,N.jsx)("button",{onClick:function(){return Ne(!1)},children:"Back"})]})]})}),(0,N.jsxs)("div",{className:"user_game__banner",children:[C&&(0,N.jsxs)("ul",{className:"user_game__banner_context",style:{top:w.y+5,left:w.x},children:[(0,N.jsx)("li",{className:"banner_context__item",onClick:function(e){e.preventDefault(),Ne(!0),E()},children:"Set Custom Banner"}),(0,N.jsx)("li",{className:"banner_context__item",children:"Set Custom Logo"}),(0,N.jsx)("li",{className:"banner_context__item",children:"Set Default Image"})]}),(0,N.jsx)("div",{className:"user_game__exit",onClick:r,children:"X"}),(0,N.jsx)("img",{className:"user_game_banner_img",src:t.banner_image||t.cover_image.replace("cover_big_2x","1080p_2x")}),(0,N.jsxs)("div",{className:"user_game__current_stats",children:[(0,N.jsxs)("div",{className:"playtime_container",children:[(0,N.jsx)(_.TCC,{className:"playtime_clock_icon"}),(0,N.jsxs)("div",{className:"stats_item",children:[(0,N.jsx)("h3",{style:{color:oe&&"#9147ff"},children:"PLAY TIME"}),(0,N.jsx)("span",{style:{display:oe&&"none"},className:"previous_playtime",onClick:function(){return ce(!0)},children:function(e){if(e<=0&&"steam"==t.type)return"Not Started";if(e<=0&&"steam"!==t.type)return"0 hours";var n=e%60,a=Math.floor(e/60);return 0==n?a+" hours":"".concat(a,".").concat(n.toString().padStart(2,"0")," hours")}(t.playtime)}),(0,N.jsx)("input",{type:"number",value:ae,min:"0",onKeyDown:function(e){"Enter"===e.key&&Qe(),"Escape"===e.key&&(ce(!1),se(Math.floor(t.playtime/60)))},onChange:function(e){return se(e.target.value)},className:"playtime_input ".concat(oe&&"playtime_focused")})]})]}),(0,N.jsx)("div",{className:"rating_container",children:(0,N.jsxs)("div",{className:"stats_item",children:[(0,N.jsx)("h3",{children:"RATING"}),(0,N.jsxs)("span",{onClick:function(){return fe(!0)},className:"previous_rating",style:{display:_e&&"none"},children:[t.user_rating||0,"%"]}),(0,N.jsx)("input",{className:"rating_input",type:"number",min:"0",max:"100",value:de||0,onKeyDown:function(e){"Enter"===e.key&&Xe(),"Escape"===e.key&&(fe(!1),me(t.user_rating))},onChange:function(e){return me(e.target.value)},style:{width:!_e&&"0px",display:!_e&&"none"}})]})}),(0,N.jsxs)("div",{className:"achievement_count_container",children:[(0,N.jsxs)("div",{className:"stats_item",children:[(0,N.jsx)("h3",{children:"STATUS"}),(0,N.jsx)("button",{onClick:function(){return Ge(!Oe)},style:{backgroundColor:"BACKLOG"==Me?"dodgerblue":"STARTED"==Me?"aqua":"FINISHED"==Me?"green":"PLAYING"==Me?"pink":"100%"==Me?"gold":"ABANDONDED"==Me?"red":"grey"},className:"status_btn",children:Me})]}),Oe&&(0,N.jsx)("div",{className:"backlog_items",children:(0,N.jsxs)("ul",{className:"backlog_items_list",children:[(0,N.jsx)("li",{style:{backgroundColor:"BACKLOG"==t.status&&"#9147ff",color:"BACKLOG"==t.status&&"white"},className:"backlog_items_item",onClick:function(){Je("BACKLOG")},children:"Backlog"}),(0,N.jsx)("li",{style:{backgroundColor:"STARTED"==t.status&&"#9147ff",color:"STARTED"==t.status&&"white"},className:"backlog_items_item",onClick:function(){Je("STARTED")},children:"Started"}),(0,N.jsx)("li",{style:{backgroundColor:"PLAYING"==t.status&&"#9147ff",color:"PLAYING"==t.status&&"white"},className:"backlog_items_item",onClick:function(){Je("PLAYING")},children:"Currently Playing"}),(0,N.jsx)("li",{style:{backgroundColor:"FINISHED"==t.status&&"#9147ff",color:"FINISHED"==t.status&&"white"},className:"backlog_items_item",onClick:function(){Je("FINISHED")},children:"Finished"}),(0,N.jsx)("li",{style:{backgroundColor:"100%"==t.status&&"#9147ff",color:"100%"==t.status&&"white"},className:"backlog_items_item",onClick:function(){Je("100%")},children:"100% Completed"}),(0,N.jsx)("li",{style:{backgroundColor:"ABANDONDED"==t.status&&"#9147ff",color:"ABANDONDED"==t.status&&"white"},className:"backlog_items_item",onClick:function(){Je("ABANDONDED")},children:"Abandonded"}),(0,N.jsx)("li",{style:{backgroundColor:"NOT OWNED"==t.status&&"#9147ff",color:"NOT OWNED"==t.status&&"white"},className:"backlog_items_item",onClick:function(){Je("NOT OWNED")},children:"Not Owned"})]})})]}),(0,N.jsx)("div",{className:"music_icon_container",children:(0,N.jsxs)("div",{className:"stats_item",style:{alignItems:"center"},children:[(0,N.jsx)("h3",{children:"MUSIC"}),(0,N.jsx)(c.HcQ,{className:"music_icon",onClick:We,style:{color:Se&&g&&"#1DB954"}})]})})]})]}),(0,N.jsx)("div",{className:"user_game__data_wrapper",style:{paddingBottom:g&&"36px"},children:(0,N.jsxs)("div",{className:"user_game__data",children:[L&&(0,N.jsx)("div",{className:"user_game__achievements_wrapper ".concat(!A.achievements&&"minimized"),children:(0,N.jsxs)("div",{className:"user_game__achievements",children:[(0,N.jsxs)("div",{className:"user_game__achievements_banner",children:[(0,N.jsx)(c.iUH,{style:{transform:A.achievements?"rotate(180deg)":"rotate(0)"},className:"user_game__minimize_icon",onClick:function(){return $e("achievements")}}),100===Ye&&(0,N.jsx)(c.PIe,{className:"user_game__completion_medal"}),(0,N.jsx)("h4",{children:(0,N.jsx)("p",{children:"Achievements"})}),(0,N.jsxs)("p",{children:["You've unlocked ",Ve(L)," (",Ye,"%)"]}),(0,N.jsx)("div",{className:"user_game__achievements_progress_bar_container",children:(0,N.jsx)("div",{className:"user_game__achievements_progress_bar",style:{width:"".concat(Ye,"%"),background:n.color}})}),(0,N.jsxs)("div",{className:"user_game__achievements_actions",children:[(0,N.jsx)("button",{className:"unlocked"==Y&&"active",onClick:function(){return K("unlocked")},children:"Unlocked"}),(0,N.jsx)("button",{className:"".concat("locked"==Y&&"active"),onClick:function(){return K("locked")},children:"In Progress"})]})]}),(0,N.jsx)("ul",{className:"user_game__achievements_list",children:L.filter((function(e){return"unlocked"==Y?e.achieved:!e.achieved})).sort((function(e,t){return e.displayName>t.displayName?1:t.displayName>e.displayName?-1:0})).map((function(e){return(0,N.jsxs)("li",{className:"achievement_item",children:[(0,N.jsx)("div",{className:"achievement_item_icon",style:{border:"1px solid ".concat(n.color)},children:(0,N.jsx)("img",{className:"achievement_item_icon__img",src:e.achieved?e.icon:e.icongray})}),(0,N.jsxs)("div",{className:"achievement_item_headers",children:[(0,N.jsx)("h4",{children:e.displayName}),e.description&&(0,N.jsx)("p",{children:e.description})]})]})}))})]})}),F&&(0,N.jsx)("div",{className:"user_game__achievements_wrapper ".concat(!A.trophies&&"minimized"),children:(0,N.jsxs)("div",{className:"user_game__achievements ".concat(100==ze&&"completed"),children:[(0,N.jsxs)("div",{className:"user_game__achievements_banner",children:[(0,N.jsx)(c.iUH,{style:{transform:A.trophies?"rotate(180deg)":"rotate(0)"},className:"user_game__minimize_icon",onClick:function(){return $e("trophies")}}),100===ze&&(0,N.jsx)(c.PIe,{className:"user_game__completion_medal"}),(0,N.jsx)("h4",{children:(0,N.jsx)("p",{children:"Trophies"})}),(0,N.jsxs)("p",{children:["You've unlocked ",Ve(F)," (",ze,"%)"]}),(0,N.jsx)("div",{className:"user_game__achievements_progress_bar_container",children:(0,N.jsx)("div",{className:"user_game__achievements_progress_bar",style:{width:"".concat(ze,"%"),background:n.color}})}),(0,N.jsxs)("div",{className:"user_game__achievements_actions",children:[(0,N.jsx)("button",{className:"unlocked"==X&&"active",onClick:function(){return Q("unlocked")},children:"Unlocked"}),ze<100&&(0,N.jsx)("button",{className:"".concat("locked"==X&&"active"),onClick:function(){return Q("locked")},children:"In Progress"})]})]}),(0,N.jsx)("ul",{className:"user_game__achievements_list",children:F.filter((function(e){return"unlocked"==X?e.earned:!e.earned})).sort((function(e,t){return e.trophyName>t.trophyName?1:t.trophyName>e.trophyName?-1:0})).map((function(e){return(0,N.jsxs)("li",{className:"achievement_item",children:[(0,N.jsx)("div",{className:"achievement_item_icon",style:{border:"1px solid ".concat(n.color)},children:(0,N.jsx)("img",{className:"achievement_item_icon__img ".concat(!e.earned&&"greyscale"),src:e.trophyIconUrl})}),(0,N.jsxs)("div",{className:"achievement_item_headers",children:[(0,N.jsx)("h4",{children:e.trophyName}),e.trophyDetail&&(0,N.jsx)("p",{children:e.trophyDetail})]})]},e.trophyName)}))})]})}),(0,N.jsx)(S,{profile:n,windowViewHandler:$e,viewStatus:A,gameNotes:$,updateNotes:Ke}),g&&Se&&(0,N.jsxs)("div",{className:"user_game__soundtrack_wrapper",children:[(0,N.jsx)("div",{className:"user_game__soundtrack_header",children:(0,N.jsx)("h3",{children:"Spotify Game Album"})}),(0,N.jsx)("div",{className:"user_game__soundtrack_playlist",children:(0,N.jsx)("ul",{children:Ie.map((function(e){return(0,N.jsx)("li",{onClick:function(t){return function(e,t){e.stopPropagation(),null!==x&&t.name==x.name&&y(),b(t)}(t,e)},children:e.name},e.trackUri)}))})})]})]})}),g&&Se&&(0,N.jsx)(Z.Z,{spotifyToken:g,playAudio:v,beginPlayback:y,pausePlayback:j,trackUri:null===x||void 0===x?void 0:x.uri})]})},M=n.p+"static/media/ps-trophy-bronze.5ca19d3acb813e595a59.png",B=n.p+"static/media/ps-trophy-gold.8b83d929060d52df9ecd.png",L=n.p+"static/media/ps-trophy-platinum.cb2e1800bc6be86cd8bc.png",U=function(e){var t=e.collection,n=e.activeProfile,d=e.backToHome,h=e.playTrack,p=e.currentTrack,_=e.isPlaying,g=e.pausePlayback,x=e.resumePlayback,v=e.spotifyToken,j=e.updateGameStatus,y=e.updateCollection,b=e.userNotes,k=(e.trackUri,(0,o.useState)("")),w=(0,i.Z)(k,2),C=w[0],S=w[1],Z=(0,o.useState)([]),E=(0,i.Z)(Z,2),P=E[0],I=E[1],A=(0,o.useState)(!1),T=(0,i.Z)(A,2),U=T[0],O=T[1],G=(0,o.useState)(!1),F=(0,i.Z)(G,2),R=F[0],H=(F[1],(0,o.useState)(!1)),z=(0,i.Z)(H,2),Y=z[0],K=z[1],V=(0,o.useState)(null),W=(0,i.Z)(V,2),X=W[0],Q=W[1],q=(0,o.useState)(null),J=(0,i.Z)(q,2),$=J[0],ee=J[1],te=(0,o.useState)(!1),ne=(0,i.Z)(te,2),ae=ne[0],se=ne[1],re=((0,o.useRef)(0),(0,o.useState)([])),ie=(0,i.Z)(re,2),oe=ie[0],ce=ie[1],le=(0,o.useState)("playtime"),ue=(0,i.Z)(le,2),de=ue[0],me=ue[1],he=(0,o.useState)("alphabetical"),pe=(0,i.Z)(he,2),_e=pe[0],fe=pe[1],ge=(0,o.useState)([]),xe=(0,i.Z)(ge,2),ve=xe[0],Ne=xe[1],je=(0,o.useState)("backlog"),ye=(0,i.Z)(je,2),be=ye[0],ke=ye[1],we=f(),Ce=we.anchorPoint,Se=we.showTitleMenu,Ze=[L,B,M];(0,o.useEffect)((function(){if(""!=C){var e=setTimeout((function(){var e=t.filter((function(e){return e.name.toLowerCase().includes(C.toLowerCase())}));I(e)}),250);return function(){return clearTimeout(e)}}I([])}),[C]),(0,o.useEffect)((function(){Promise.all(ve.map((function(e){return function(e){return new Promise((function(t,n){var a=new Image;a.src=e.cover_image,a.onload=function(){return setTimeout((function(){t(e.cover_image)}),2e3)},a.onerror=function(e){return n(e)}}))}(e)}))).then((function(){return O(!0)})).catch((function(e){return console.log("Failed to load images",e)}))}),[]),(0,o.useEffect)((function(){function e(){window.innerWidth<=650?K(!0):K(!1)}return window.innerWidth<=650&&K(!0),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),(0,o.useEffect)((function(){ce("playtime"==de?(0,r.Z)(t).sort((function(e,t){return t[de]-e[de]})):"user_rating"==de?t.filter((function(e){return e.user_rating})).sort((function(e,t){return t.user_rating-e.user_rating})):t.filter((function(e){return e.achievements})).sort((function(e,t){return t.achievements-e.achievements})))}),[de,t]),(0,o.useEffect)((function(){Ne("achievements"==_e?(0,r.Z)(t).filter((function(e){return e.achievements})).sort((function(e,t){return t.achievements-e.achievements})):"playtime"==_e?(0,r.Z)(t).filter((function(e){return e.playtime>0})).sort((function(e,t){return t.playtime-e.playtime})):"status"==_e?(0,r.Z)(t).filter((function(e){return e.status==be.toUpperCase()})):"rating"==_e?(0,r.Z)(t).filter((function(e){return e.user_rating})).sort((function(e,t){return t.user_rating-e.user_rating})):"trophies"==_e?(0,r.Z)(t).filter((function(e){return e.trophies})).sort((function(e,t){return e.trophies-t.trophies})):(0,r.Z)(t).sort((function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:e.name.toUpperCase()<t.name.toUpperCase()?-1:0})))}),[_e,be,t]);var Ee=function(e){Q(e)},Pe=function(e){var t;switch(_e){case"playtime":return Math.floor(e.playtime/60)>=1?(0,N.jsxs)("span",{className:"filter_stat",children:[Math.floor(e.playtime/60)," ",1==Math.floor(e.playtime/60)?"hour":"hours"]}):(0,N.jsxs)("span",{className:"filter_stat",children:[e.playtime," ",1==e.playtime?"minute":"minutes"]});case"rating":return(0,N.jsxs)("span",{className:"filter_stat rating_stat",children:[e.user_rating,"%"]});case"trophies":if(!e.trophies)break;var n=null===e||void 0===e||null===(t=e.trophies)||void 0===t?void 0:t.filter((function(e){return e.earned}));return(0,N.jsxs)("span",{className:"filter_stat",children:[Math.floor(n.length/e.trophies.length*100),"% earned"]})}},Ie=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m().put("".concat("https://gameflix.up.railway.app","/app/add_imported_collection"),{email:localStorage.getItem("user"),profile:localStorage.getItem("profile"),collection:t});case 3:n=e.sent,console.log(n),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}();if(U)return(0,N.jsx)("div",{className:"user_collection__wrapper",children:(0,N.jsxs)("div",{className:"user_collection__container",style:{background:"#111"},children:[(0,N.jsxs)("div",{className:"user_collection__left",style:{height:R&&"250%",marginBottom:R&&"25px",display:Y&&X&&"none"},children:[(0,N.jsxs)("div",{className:"user_collection__left_header",children:[(0,N.jsxs)("h2",{children:[(0,N.jsx)("img",{style:{height:"50px",width:"50px",borderRadius:"4px"},src:n.avatar}),n.name.trim(),"'s Collection",(0,N.jsx)(l.QEt,{className:"user_collection__upload_icon",onClick:function(){return se(!ae)}}),ae&&(0,N.jsx)("div",{className:"upload_dropdown_wrapper",children:(0,N.jsxs)("ul",{className:"upload_dropdown_list",children:[(0,N.jsxs)("li",{children:[" ",(0,N.jsx)("input",{style:{display:"none"},type:"file",name:"file",className:"custom-file-input",id:"inputGroupFile",required:!0,onChange:function(e){var t=e.target.files;if(t.length){var n=t[0],a=new FileReader;a.onload=function(e){var t=(0,u.ij)(e.target.result),n=t.SheetNames;if(n.length){var a=u.P6.sheet_to_json(t.Sheets[n[0]]);Ne(a),Ie(a)}},a.readAsArrayBuffer(n)}se(!1)},accept:".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"}),(0,N.jsx)("label",{className:"custom-file-label",htmlFor:"inputGroupFile",children:"Import CSV"})]}),(0,N.jsx)("li",{onClick:function(){var e=u.P6.book_new(),t=u.P6.json_to_sheet([]);u.P6.sheet_add_aoa(t,[["name","id","cover_image","playtime","origin","status","user_rating","banner_image"]]),u.P6.sheet_add_json(t,ve,{origin:"A2",skipHeader:!0}),u.P6.book_append_sheet(e,t,"Game"),(0,u.NC)(e,"Game Collection.xlsx"),se(!1)},children:"Export CSV"})]})}),(0,N.jsx)(c.xng,{className:"user_collection__home_icon",onClick:d})]}),(0,N.jsxs)("div",{className:"user_collection__search",children:[(0,N.jsx)(c.Ozl,{className:"user_collection__search_icon"}),(0,N.jsx)("input",{className:"user_collection__search_input",value:C,onChange:function(e){return S(e.target.value)}})]})]}),(0,N.jsxs)("ul",{className:"user_collection__title_list",style:{height:R&&"100%",display:R&&"flex"},children:[(0,N.jsxs)("p",{className:"user_collection__total",style:{color:"white",paddingLeft:"7px",marginBottom:"5px",position:"fixed",top:"132px",left:"1px",fontSize:".95rem",width:"100%",height:"22px",background:"linear-gradient(to right, rgba(25,25,25,.5) 0%,rgba(17,17,17,1) 46%,rgba(1,1,1,1) 50%,rgba(10,10,10,1) 53%,rgba(78,78,78,1) 76%,rgba(56,56,56,1) 87%,rgba(27,27,27,1) 100%)",display:"flex",alignItems:"center"},children:[P.length<=0&&""==C?"All":"Results"," ","(",(0,N.jsx)("span",{style:{fontSize:".75rem"},children:""==C?t.length:P.length}),")"]}),""==C?t.sort((function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:e.name.toUpperCase()<t.name.toUpperCase()?-1:0})).map((function(e){return(0,N.jsxs)("li",{className:"title_list__item",onClick:function(){return Ee(e)},onContextMenu:function(t){return function(e,t){e.preventDefault(),ee(t)}(t,e)},style:{background:(null===X||void 0===X?void 0:X.id)==e.id&&"#9147ff",color:(null===X||void 0===X?void 0:X.id)==e.id&&"white"},children:[" ",(0,N.jsx)("img",{src:e.cover_image}),(0,N.jsx)("p",{children:e.name}),e.name==n.favorite_game&&(0,N.jsx)(c.QJe,{className:"list_item_favorite"}),Se&&(0,N.jsxs)("ul",{onMouseEnter:function(e){return e.stopPropagation(!0)},className:"user_collection__game_context",style:{top:Ce.y,left:Ce.x,zIndex:6},children:[(0,N.jsx)("li",{className:"banner_context__item",children:"Add to Favorites"}),(0,N.jsx)("li",{className:"banner_context__item",onClick:function(e){return function(e){e.stopPropagation(),Object.keys(X).length>0&&$.id===X.id&&Q(null),j("REMOVE",$),ee(null)}(e)},children:"Delete Game"})]})]},e.id)})):P.length>0&&""!=C?P.map((function(e){return(0,N.jsxs)("li",{className:"title_list__item",onClick:function(){return Ee(e)},children:[" ",(0,N.jsx)("img",{src:e.cover_image}),(0,N.jsx)("p",{children:e.name})]},e.id)})):(0,N.jsx)("p",{style:{color:"white",fontSize:"3.2rem",position:"absolute",top:"30%",left:"16px"},children:"No Matches"}),(0,N.jsx)("div",{className:"user_collection__title_list_shadow"}),(0,N.jsx)("div",{className:"user_collection__title_list_shadow top_shadow"})]}),(0,N.jsx)("div",{className:"user_collection__actions",children:(0,N.jsx)("button",{className:"persona_font",onClick:d,children:"Back"})})]}),(0,N.jsxs)("div",{className:"user_collection__right",children:[null!==X&&(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(D,{game:X,activeProfile:n,closeStats:function(){return Q(null)},setCurrentGame:function(e){return Q(e)},updateCollection:y,userNotes:b,spotifyToken:v,currentTrack:p,playAudio:_,pausePlayback:g,playTrack:h,beginPlayback:x})}),!X&&(0,N.jsxs)(N.Fragment,{children:[!Y&&(0,N.jsxs)("div",{className:"user_collection__spotlight_wrapper",children:[(0,N.jsxs)("div",{className:"spotlight_filters",children:[(0,N.jsxs)("h2",{className:"spotlight_filter",children:["playtime"==de?"Most Played":"user_rating"==de?"Highest Rated":"Most Achievements"," "]}),(0,N.jsxs)("ul",{className:"spotlight_filter__options",children:[(0,N.jsx)("li",{onClick:function(){return me("playtime")},style:{color:"playtime"==de&&"white"},children:"Most Played"}),(0,N.jsx)("li",{onClick:function(){return me("user_rating")},style:{color:"user_rating"==de&&"white"},children:"Highest Rated"}),(0,N.jsx)("li",{onClick:function(){return me("achievements")},style:{color:"achievements"==de&&"white"},children:"Most Achievements"})]})]}),(0,N.jsx)("div",{className:"user_collection__spotlight",children:oe.slice(0,3).map((function(e,t){return(0,N.jsxs)("figure",{className:"spotlight_container",onClick:function(){return Ee(e)},children:[(0,N.jsx)("img",{className:"spotlight_image",src:e.banner_url||e.cover_image}),(0,N.jsxs)("div",{className:"spotlight_container__row",children:[(0,N.jsx)("img",{className:"spotlight_trophy_image",src:Ze[t]}),(0,N.jsx)("figcaption",{className:"spotlight_details",children:(0,N.jsxs)("p",{children:["playtime"==de?"".concat(Math.floor(e.playtime/60)," hours"):"user_rating"==de?e.user_rating+"%":"ACHIEVE"," "]})})]})]},e.id)}))})]}),(0,N.jsxs)("div",{className:"user_collection__list_container",children:[(0,N.jsxs)("div",{className:"user_collection__list_filters",children:[(0,N.jsx)("p",{style:{marginBottom:"2px",fontSize:"1.5rem"},children:"alphabetical"==_e?"All Games":"achievements"==_e?"Achievements":"playtime"==_e?"Playtime":"rating"==_e?"Rating":"Status"}),(0,N.jsxs)("ul",{className:"user_collection__list_filters__list",children:[(0,N.jsx)("li",{style:{color:"alphabetical"==_e&&"white"},onClick:function(){return fe("alphabetical")},children:"All"}),(0,N.jsx)("span",{children:" | "}),(0,N.jsx)("li",{style:{color:"achievements"==_e&&"white"},onClick:function(){return fe("achievements")},children:"Achievements"}),(0,N.jsx)("span",{children:" | "}),(0,N.jsx)("li",{style:{color:"playtime"==_e&&"white"},onClick:function(){return fe("playtime")},children:"Playtime"}),(0,N.jsx)("span",{children:" | "}),(0,N.jsx)("li",{style:{color:"rating"==_e&&"white"},onClick:function(){return fe("rating")},children:"Rating"}),(0,N.jsx)("span",{children:" | "}),(0,N.jsx)("li",{style:{color:"status"==_e&&"white"},onClick:function(){fe("status"),ke("backlog")},children:"Status"})]}),"status"==_e&&(0,N.jsx)("div",{className:"user_collection__list_filters__list",style:{margin:"0"},children:(0,N.jsxs)("ul",{className:"user_collection__list_filters__list_status",style:{flexDirection:"row"},children:[(0,N.jsx)("li",{style:{color:"backlog"==be&&"white"},onClick:function(){return ke("backlog")},children:"Backlog"}),(0,N.jsx)("span",{children:" | "}),(0,N.jsx)("li",{style:{color:"started"==be&&"white"},onClick:function(){return ke("started")},children:"Started"}),(0,N.jsx)("span",{children:" | "}),(0,N.jsx)("li",{style:{color:"playing"==be&&"white"},onClick:function(){return ke("playing")},children:"Playing"}),(0,N.jsx)("span",{children:" | "}),(0,N.jsx)("li",{style:{color:"finished"==be&&"white"},onClick:function(){return ke("finished")},children:"Finished"}),(0,N.jsx)("span",{children:" | "}),(0,N.jsx)("li",{style:{color:"100%"==be&&"white"},onClick:function(){return ke("100%")},children:"100%"}),(0,N.jsx)("span",{children:" | "}),(0,N.jsx)("li",{style:{color:"abandonded"==be&&"white"},onClick:function(){return ke("abandonded")},children:"Abandonded"}),(0,N.jsx)("span",{children:" | "}),(0,N.jsx)("li",{style:{color:"not owned"==be&&"white"},onClick:function(){return ke("not owned")},children:"Not Owned"})]})})]}),(0,N.jsx)("ul",{className:"user_collection__list",children:!Y||Y&&""==C?ve.map((function(e){return(0,N.jsxs)("li",{className:"list_item",onClick:function(){return Ee(e)},children:[(0,N.jsxs)("div",{className:"user_collection__poster_container",children:[(0,N.jsx)("div",{className:"gradient"}),(0,N.jsx)(N.Fragment,{children:(0,N.jsx)("div",{className:"user_collection__poster_front",children:(0,N.jsx)("img",{className:"user_collection__poster",src:e.cover_image,alt:e.name})})})]}),Pe(e)]},e.id)})):P.map((function(e){return(0,N.jsx)("li",{className:"list_item",onClick:function(){return Ee(e)},children:(0,N.jsxs)("div",{className:"user_collection__poster_container",children:[(0,N.jsx)("div",{className:"gradient"}),(0,N.jsx)(N.Fragment,{children:(0,N.jsx)("div",{className:"user_collection__poster_front",children:(0,N.jsx)("img",{className:"user_collection__poster",src:Y?e.cover_image.replace("cover_big","1080p"):e.cover_image,alt:e.name})})})]})},e.id)}))})]})]})]})]})})}}}]);
//# sourceMappingURL=331.2ac44c42.chunk.js.map
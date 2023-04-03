"use strict";(self.webpackChunkgameflix=self.webpackChunkgameflix||[]).push([[865],{5558:function(e,A,a){a.r(A),a.d(A,{default:function(){return _}});var s=a(9439),n=a(2791),r=a(4569),t=a.n(r),i=a(6355),l=a(4112),o=a.p+"static/media/computer_screen.616ef1b1c54cb3cd6a77.png",c=a.p+"static/media/gameflix-demo.b0f6b37a1fa11965f828.webm",m=a.p+"static/media/retro-tv.c238b0c07e22d5d8810b.png",d=a.p+"static/media/ff7-cloud.3c58c466f25bf45009f1.png",f=a.p+"static/media/mario.1912a44f929c934b53f5.png",p=a.p+"static/media/master-chief.22d379fb57515ecf10ff.png",u=a.p+"static/media/loz-link.be32570b5fe0fa9d4f2a.png",x=a.p+"static/media/spyro.7bc3544089c7f0e7d88c.png",g=a.p+"static/media/sonic.65a1b667a30f501cb7bf.png",h=a(4165),N=a(5861),v=a(6475),j=a(4257),b=a(184),S=function(e){var A=(0,n.useState)(1),a=(0,s.Z)(A,2),r=a[0],i=a[1],l=(0,n.useState)(!1),o=(0,s.Z)(l,2),c=o[0],m=o[1],d=(0,n.useState)("#9147ff"),f=(0,s.Z)(d,2),p=f[0],u=f[1],x=(0,n.useState)({}),g=(0,s.Z)(x,2),S=g[0],_=g[1],T=(0,n.useRef)(""),B=(0,n.useRef)(""),q=(0,n.useState)({}),z=(0,s.Z)(q,2),C=z[0],O=z[1],k=(0,n.useRef)(""),Y=(0,n.useRef)(""),w=(0,n.useState)(null),y=(0,s.Z)(w,2),G=y[0],Q=y[1],H=(0,n.useState)(null),U=(0,s.Z)(H,2),E=U[0],P=U[1],R=(0,n.useState)(!1),F=(0,s.Z)(R,2),I=F[0],J=F[1];console.log(p);(0,n.useEffect)((function(){c&&T.current&&T.current.focus()}),[]);var X=function(){var e=(0,N.Z)((0,h.Z)().mark((function e(A){var a,s,n,l,o,d;return(0,h.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(A.preventDefault(),m(!1),1!=r){e.next=8;break}a=T.current.value.trim(),s=B.current.value.trim(),""!=a&&a.includes("@")?""==s||s.length<7?m("Please enter a valid password that is 7 characters or more!"):(_({email:a,password:s}),i(r+1),m(!1)):m("Please enter a valid email"),e.next=42;break;case 8:if(2!=r){e.next=14;break}n=k.current.value,l=Y.current.value,""==n.trim()||""==l.trim()?m("Please don't leave name fields empty!"):(O({firstName:n,lastName:l}),i(r+1),m(!1)),e.next=42;break;case 14:return J(!0),(o=new FormData).append("firstName",C.firstName),o.append("lastName",C.lastName),o.append("email",S.email),o.append("password",S.password),o.append("color",p.hex),o.append("avatar",G||v),e.next=24,f=o,t().post("".concat("https://gameflixx.netlify.app","/authentication/signup"),f).then((function(e){return console.log(e),e})).catch((function(e){m(e.response.data.message)}));case 24:if(d=e.sent,console.log(G),d||null===G||"mp4"!=G.type.split("/")[1]&&""!=G.type){e.next=32;break}return m("Invalid file type not supported, please use a valid PNG, JPG, JPEG, GIF, or ICO file."),J(!1),e.abrupt("return");case 32:if(c||!d||d.data.message){e.next=37;break}localStorage.setItem("user",d.data.email),window.location.reload(),e.next=42;break;case 37:return J(!1),console.log(d),i(1),m(null),e.abrupt("return");case 42:case"end":return e.stop()}var f}),e)})));return function(A){return e.apply(this,arguments)}}();return(0,b.jsxs)("div",{className:"new_user__page",children:[(0,b.jsxs)("div",{className:"new_user__header",children:[(0,b.jsx)("h1",{className:"header_brand",onClick:function(){return e.returnToLanding()},children:"GAMEFLIX"}),(0,b.jsx)("button",{className:"header_btn",onClick:e.toLoginHandler,children:"Sign In"})]}),(0,b.jsx)("div",{className:"new_user__forms_container",children:(0,b.jsxs)("div",{className:"new_user__forms",children:[!I&&(0,b.jsxs)("p",{className:"forms_step",children:["STEP ",(0,b.jsx)("span",{className:"bold",children:r})," OF"," ",(0,b.jsx)("span",{className:"bold",children:"3"})]}),!I&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"forms_info",children:(0,b.jsx)("h1",{className:"info_title",children:1==r?"Start now by creating an account to gain acess to your personal collection of games!":2==r?"Tell us a little more about yourself, enter your first and last name in the boxes below!":"Click the image below to set your profile picture and select your favorite color!"})}),(0,b.jsxs)("form",{className:"new_user__form",style:{alignItems:r>=3&&"center"},onSubmit:X,encType:"multipart/form-data",children:[1==r&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("input",{ref:T,className:"form_text_input ".concat(c&&"input_error"),type:"email",onBlur:function(){return c&&m(null)},defaultValue:c?S.email:e.email}),(0,b.jsx)("span",{className:"form_placeholder__email",children:"Email"}),c&&(0,b.jsx)("p",{className:"user_email_error",children:c}),(0,b.jsx)("input",{ref:B,className:"form_text_input",type:"password"}),(0,b.jsx)("span",{className:"form_placeholder__password",children:"Password"})]}),2==r&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("input",{ref:k,defaultValue:null===C||void 0===C?void 0:C.firstName,className:"form_text_input"}),c&&(0,b.jsx)("p",{className:"step_two__error",children:c}),(0,b.jsx)("span",{className:"form_placeholder__first_name",children:"First Name"}),(0,b.jsx)("input",{ref:Y,defaultValue:null===C||void 0===C?void 0:C.lastName,className:"form_text_input"}),(0,b.jsx)("span",{className:"form_placeholder__last_name",children:"Last Name"})]}),r>=3&&(0,b.jsxs)(b.Fragment,{children:[c&&(0,b.jsx)("p",{className:"form_file_error",children:c}),(0,b.jsxs)("div",{className:"form_file_container",children:[(0,b.jsx)("div",{className:"form_file",style:{backgroundImage:"url(".concat(null==G?v:E,")"),backgroundSize:"contain",backgroundPosition:"center center",backgroundColor:p.hex},children:(0,b.jsx)("input",{onChange:function(e){P(URL.createObjectURL(e.target.files[0])),Q(e.target.files[0]),console.log(e)},className:"form_file_input",type:"file"})}),(0,b.jsx)("div",{className:"color_picker_container",children:(0,b.jsx)(j.e8,{color:p,onChangeComplete:function(e){return u(e)}})})]})]}),(0,b.jsx)("button",{className:"form_actions_btn",type:"submit",style:{width:3==r&&"52%"},children:3!==r?"Next":"Submit"}),1!==r&&(0,b.jsx)("button",{type:"button",onClick:function(){u("#9147ff"),i(r-1),c&&m(!1)},className:"form_back_btn",children:"Back"})]})]}),I&&(0,b.jsx)("div",{className:"new_user__loading",children:(0,b.jsx)("div",{className:"new_user__spinner"})})]})})]})},_=function(e){var A,a=e.toSignIn,r=e.images,h=(0,n.useState)(null),N=(0,s.Z)(h,2),v=N[0],j=N[1],_=(0,n.useState)(!1),T=(0,s.Z)(_,2),B=T[0],q=T[1],z=(0,n.useState)(!1),C=(0,s.Z)(z,2),O=C[0],k=C[1],Y=(0,n.useRef)(""),w=function(){a()};return O&&!v?(0,b.jsx)(S,{toWelcomeScreen:function(e,A){},email:null===(A=Y.current)||void 0===A?void 0:A.value,returnToLanding:function(){return k(!1)},toLoginHandler:w}):(0,b.jsxs)("div",{className:"landing_page",children:[(0,b.jsxs)("div",{className:"landing_banner",children:[(0,b.jsx)("div",{className:"landing_banner__fade_top"}),(0,b.jsxs)("div",{className:"landing_nav",children:[(0,b.jsx)("div",{className:"nav_left",children:(0,b.jsx)("h3",{className:"nav_badge",children:"GAMEFLIX"})}),(0,b.jsx)("div",{className:"nav_right",children:(0,b.jsx)("button",{className:"sign_in_btn",onClick:w,children:"Sign In"})})]}),(0,b.jsxs)("div",{className:"landing_banner__content",children:[(0,b.jsx)("h1",{children:"Looking for a big title, a taste of nostalgia, or a hidden gem?"}),(0,b.jsx)("h3",{children:"Watch trailers. Listen to OSTs."}),(0,b.jsx)("p",{children:"Discover your favorites plus thousands more! Enter your email to get started."}),(0,b.jsxs)("form",{className:"landing__form",onSubmit:function(e){e.preventDefault();var A=Y.current.value.toLowerCase().trim();""!=A?t().post("".concat("https://gameflixx.netlify.app","/authentication/email_verification"),{email:A}).then((function(e){k(!0),q(!1)})).catch((function(e){j(e.response.data.message),Y.current.blur()})):j("Please enter a valid email.")},children:[(0,b.jsx)("input",{type:"email",className:"landing__email ".concat(v&&"email_error"),ref:Y,onFocus:function(){q(!0),v&&(Y.current.value="",j(null))},onBlur:function(){""===Y.current.value&&q(q(!1))}}),(0,b.jsx)("span",{className:"email_placeholder ".concat(B&&"email_focused"),children:"Email address"}),v&&(0,b.jsx)("p",{className:"sign_up_error",children:v}),(0,b.jsxs)("button",{children:["Get Started ",(0,b.jsx)(i.H_v,{className:"btn_arrow"})]})]})]}),(0,b.jsx)("div",{className:"landing_banner__background",children:r.map((function(e){return(0,b.jsx)(n.Fragment,{children:(0,b.jsx)("img",{className:"landing_banner__img",src:e.props.children.props.src})},e.key)}))}),(0,b.jsx)("div",{className:"landing_banner__fade_bottom"})]}),(0,b.jsxs)("div",{className:"landing__demo",children:[(0,b.jsxs)("div",{className:"demo_left",children:[(0,b.jsx)("h1",{className:"demo_left_title",children:"Endless Choices"}),(0,b.jsx)("p",{className:"demo_left_description",children:"Endless titles. Endless hours. Endless oppurtunities."})]}),(0,b.jsxs)("div",{className:"demo_right",children:[(0,b.jsx)("div",{className:"demo_video_container",children:(0,b.jsx)(l.Z,{url:c,className:"demo_video",playing:!0,muted:!0,loop:!0})}),(0,b.jsx)("img",{src:o,className:"demo_pc_img"})]})]}),(0,b.jsxs)("div",{className:"landing__information",children:[(0,b.jsxs)("div",{className:"information_left",children:[(0,b.jsx)("img",{src:m,className:"information_tv_img"}),(0,b.jsxs)("div",{className:"information_characters",children:[(0,b.jsx)("img",{className:"chief-img",src:p}),(0,b.jsx)("img",{className:"cloud-img",src:d}),(0,b.jsx)("img",{className:"mario-img",src:f}),(0,b.jsx)("img",{className:"link-img",src:u}),(0,b.jsx)("img",{className:"spyro-img",src:x}),(0,b.jsx)("img",{className:"sonic-img",src:g})]})]}),(0,b.jsxs)("div",{className:"information_right",children:[(0,b.jsx)("h1",{className:"information_right_title",children:"Reexperience your Childhood"}),(0,b.jsx)("p",{className:"information_right_description",children:"Rediscover lost loves and relive your nostalgic glory days."})]})]}),(0,b.jsxs)("div",{className:"landing__profiles",children:[(0,b.jsxs)("div",{className:"profiles__left",children:[(0,b.jsx)("h1",{className:"profiles__left_title",children:"Gaming your Way"}),(0,b.jsx)("p",{className:"profiles__left_description",children:"Discover multiple games from your favorite genres, publishers, or consoles."})]}),(0,b.jsx)("div",{className:"profiles__right",children:(0,b.jsx)("img",{className:"profiles__logo_collection",src:"data:image/jpeg;base64,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",alt:"a collection of different video game console logos"})})]})]})}},6475:function(e,A,a){e.exports=a.p+"static/media/basic_avatar.9eeabb71d2fe70b7ff75.png"}}]);
//# sourceMappingURL=865.b4d498dc.chunk.js.map
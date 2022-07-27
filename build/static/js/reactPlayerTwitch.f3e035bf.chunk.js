"use strict";(self.webpackChunkgameflix=self.webpackChunkgameflix||[]).push([[216],{8140:function(e,t,n){function r(e){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!==typeof e)return{default:e};var t=l();if(t&&t.has(e))return t.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var i=o?Object.getOwnPropertyDescriptor(e,a):null;i&&(i.get||i.set)?Object.defineProperty(n,a,i):n[a]=e[a]}n.default=e,t&&t.set(e,n);return n}(n(2791)),a=n(2737),i=n(7709);function l(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},f(e,t)}function s(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h(e);if(t){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return y(this,n)}}function y(e,t){return!t||"object"!==r(t)&&"function"!==typeof t?d(e):t}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v="twitch-player-",O=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(y,e);var t,n,r,l=s(y);function y(){var e;c(this,y);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return b(d(e=l.call.apply(l,[this].concat(n))),"callPlayer",a.callPlayer),b(d(e),"playerID",e.props.config.playerId||"".concat(v).concat((0,a.randomString)())),b(d(e),"mute",(function(){e.callPlayer("setMuted",!0)})),b(d(e),"unmute",(function(){e.callPlayer("setMuted",!1)})),e}return t=y,n=[{key:"componentDidMount",value:function(){this.props.onMount&&this.props.onMount(this)}},{key:"load",value:function(e,t){var n=this,r=this.props,o=r.playsinline,l=r.onError,c=r.config,p=r.controls,f=i.MATCH_URL_TWITCH_CHANNEL.test(e),s=f?e.match(i.MATCH_URL_TWITCH_CHANNEL)[1]:e.match(i.MATCH_URL_TWITCH_VIDEO)[1];t?f?this.player.setChannel(s):this.player.setVideo("v"+s):(0,a.getSDK)("https://player.twitch.tv/js/embed/v1.js","Twitch").then((function(t){n.player=new t.Player(n.playerID,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({video:f?"":s,channel:f?s:"",height:"100%",width:"100%",playsinline:o,autoplay:n.props.playing,muted:n.props.muted,controls:!!f||p,time:(0,a.parseStartTime)(e)},c.options));var r=t.Player,i=r.READY,l=r.PLAYING,y=r.PAUSE,d=r.ENDED,h=r.ONLINE,v=r.OFFLINE,O=r.SEEK;n.player.addEventListener(i,n.props.onReady),n.player.addEventListener(l,n.props.onPlay),n.player.addEventListener(y,n.props.onPause),n.player.addEventListener(d,n.props.onEnded),n.player.addEventListener(O,n.props.onSeek),n.player.addEventListener(h,n.props.onLoaded),n.player.addEventListener(v,n.props.onLoaded)}),l)}},{key:"play",value:function(){this.callPlayer("play")}},{key:"pause",value:function(){this.callPlayer("pause")}},{key:"stop",value:function(){this.callPlayer("pause")}},{key:"seekTo",value:function(e){this.callPlayer("seek",e)}},{key:"setVolume",value:function(e){this.callPlayer("setVolume",e)}},{key:"getDuration",value:function(){return this.callPlayer("getDuration")}},{key:"getCurrentTime",value:function(){return this.callPlayer("getCurrentTime")}},{key:"getSecondsLoaded",value:function(){return null}},{key:"render",value:function(){return o.default.createElement("div",{style:{width:"100%",height:"100%"},id:this.playerID})}}],n&&p(t.prototype,n),r&&p(t,r),y}(o.Component);t.default=O,b(O,"displayName","Twitch"),b(O,"canPlay",i.canPlay.twitch),b(O,"loopOnEnded",!0)}}]);
//# sourceMappingURL=reactPlayerTwitch.f3e035bf.chunk.js.map
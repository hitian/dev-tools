(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{147:function(module,exports,__webpack_require__){(function(global){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;!function(e,t){module.exports=t(e)}("undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==global?global:this,(function(global){"use strict";global=global||{};var _Base64=global.Base64,version="2.5.1",buffer;if(module.exports)try{buffer=eval("require('buffer').Buffer")}catch(e){buffer=void 0}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b64tab=function(e){for(var t={},i=0,o=e.length;i<o;i++)t[e.charAt(i)]=i;return t}(b64chars),fromCharCode=String.fromCharCode,cb_utob=function(e){if(e.length<2)return(t=e.charCodeAt(0))<128?e:t<2048?fromCharCode(192|t>>>6)+fromCharCode(128|63&t):fromCharCode(224|t>>>12&15)+fromCharCode(128|t>>>6&63)+fromCharCode(128|63&t);var t=65536+1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320);return fromCharCode(240|t>>>18&7)+fromCharCode(128|t>>>12&63)+fromCharCode(128|t>>>6&63)+fromCharCode(128|63&t)},re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,utob=function(u){return u.replace(re_utob,cb_utob)},cb_encode=function(e){var t=[0,2,1][e.length%3],o=e.charCodeAt(0)<<16|(e.length>1?e.charCodeAt(1):0)<<8|(e.length>2?e.charCodeAt(2):0);return[b64chars.charAt(o>>>18),b64chars.charAt(o>>>12&63),t>=2?"=":b64chars.charAt(o>>>6&63),t>=1?"=":b64chars.charAt(63&o)].join("")},btoa=global.btoa?function(b){return global.btoa(b)}:function(b){return b.replace(/[\s\S]{1,3}/g,cb_encode)},_encode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(u){return(u.constructor===buffer.constructor?u:buffer.from(u)).toString("base64")}:function(u){return(u.constructor===buffer.constructor?u:new buffer(u)).toString("base64")}:function(u){return btoa(utob(u))},encode=function(u,e){return e?_encode(String(u)).replace(/[+\/]/g,(function(e){return"+"==e?"-":"_"})).replace(/=/g,""):_encode(String(u))},encodeURI=function(u){return encode(u,!0)},re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),cb_btou=function(e){switch(e.length){case 4:var t=((7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3))-65536;return fromCharCode(55296+(t>>>10))+fromCharCode(56320+(1023&t));case 3:return fromCharCode((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return fromCharCode((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},btou=function(b){return b.replace(re_btou,cb_btou)},cb_decode=function(e){var t=e.length,o=t%4,r=(t>0?b64tab[e.charAt(0)]<<18:0)|(t>1?b64tab[e.charAt(1)]<<12:0)|(t>2?b64tab[e.charAt(2)]<<6:0)|(t>3?b64tab[e.charAt(3)]:0),n=[fromCharCode(r>>>16),fromCharCode(r>>>8&255),fromCharCode(255&r)];return n.length-=[0,0,2,1][o],n.join("")},_atob=global.atob?function(a){return global.atob(a)}:function(a){return a.replace(/\S{1,4}/g,cb_decode)},atob=function(a){return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g,""))},_decode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(a){return(a.constructor===buffer.constructor?a:buffer.from(a,"base64")).toString()}:function(a){return(a.constructor===buffer.constructor?a:new buffer(a,"base64")).toString()}:function(a){return btou(_atob(a))},decode=function(a){return _decode(String(a).replace(/[-_]/g,(function(e){return"-"==e?"+":"/"})).replace(/[^A-Za-z0-9\+\/]/g,""))},noConflict=function(){var e=global.Base64;return global.Base64=_Base64,e};if(global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict,__buffer__:buffer},"function"==typeof Object.defineProperty){var noEnum=function(e){return{value:e,enumerable:!1,writable:!0,configurable:!0}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum((function(){return decode(this)}))),Object.defineProperty(String.prototype,"toBase64",noEnum((function(e){return encode(this,e)}))),Object.defineProperty(String.prototype,"toBase64URI",noEnum((function(){return encode(this,!0)})))}}return global.Meteor&&(Base64=global.Base64),module.exports?module.exports.Base64=global.Base64:(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return global.Base64}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)),{Base64:global.Base64}}))}).call(this,__webpack_require__(27))},293:function(e,t,o){"use strict";o.r(t);var r=o(147).Base64,n={data:function(){return{message:"",input:"",output:"",copy_success:!1}},head:function(){return{title:"base64 encode & decode",meta:[{hid:"description",name:"description",content:"base64 encode & decode"}]}},methods:{encode:function(){""==this.input.length&&this.showMessage("input empty");var e=r.encode(this.input);e.length>0?this.output=e:this.showMessage("encode failed.")},decode:function(){""==this.input.length&&this.showMessage("input empty");var e=r.decode(this.input);e.length>0?this.output=e:this.showMessage("decode failed.")},showMessage:function(e){var t=this;this.message=e,setTimeout((function(){t.message=""}),5e3)},showCopySuccess:function(){var e=this;this.copy_success=!0,setTimeout((function(){e.copy_success=!1}),5e3)},copyResult:function(e){var t=e.target;t.focus(),t.select();try{if(document.execCommand("copy"))return void this.showCopySuccess()}catch(e){console.log("Oops, unable to copy: "+e)}},selectAll:function(e){e.target.select()}}},c=o(13),component=Object(c.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("h5",[e._v("Base64")]),e._v(" "),o("div",{staticClass:"form"},[o("div",{staticClass:"form-group"},[o("textarea",{directives:[{name:"model",rawName:"v-model",value:e.input,expression:"input"}],staticClass:"form-control",attrs:{placeholder:"input here",cols:"30",rows:"10"},domProps:{value:e.input},on:{dblclick:e.selectAll,input:function(t){t.target.composing||(e.input=t.target.value)}}})]),e._v(" "),o("div",{staticClass:"form-group"},[o("button",{staticClass:"btn btn-primary",on:{click:e.decode}},[e._v("decode")]),e._v(" "),o("button",{staticClass:"btn btn-warning ml-5",on:{click:e.encode}},[e._v("encode")]),e._v(" "),e.message?o("span",{staticClass:"badge badge-warning ml-3"},[e._v(e._s(e.message))]):e._e(),e._v(" "),e.copy_success?o("span",{staticClass:"badge badge-success ml-3"},[e._v("result copied to clipboard")]):e._e()]),e._v(" "),o("div",{staticClass:"form-group"},[o("textarea",{directives:[{name:"model",rawName:"v-model",value:e.output,expression:"output"}],staticClass:"form-control",attrs:{placeholder:"result here",cols:"30",readonly:"",rows:"15"},domProps:{value:e.output},on:{click:e.copyResult,input:function(t){t.target.composing||(e.output=t.target.value)}}})])])])}),[],!1,null,null,null);t.default=component.exports}}]);
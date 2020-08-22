(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{154:function(e,t,n){"use strict";var r={props:["value","readonly"],methods:{selectAll:function(){this.$refs.input_textarea.select()},copyAll:function(){var e=this.$refs.input_textarea;e.focus(),e.select();try{if(document.execCommand("copy"))return void this.showCopySuccess()}catch(e){console.log("Oops, unable to copy: "+e)}}}},o=n(14),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"ml-3 mr-3"},[n("div",{staticClass:"row"},[n("textarea",{ref:"input_textarea",staticClass:"form-control",attrs:{readonly:e.readonly,cols:"30",rows:"10"},domProps:{value:e.value},on:{input:function(t){return e.$emit("input",t.target.value)}}})]),e._v(" "),n("div",{staticClass:"text-right mt-2"},[n("button",{staticClass:"btn btn-primary",on:{click:e.selectAll}},[e._v("Select All")]),e._v(" "),n("button",{staticClass:"btn btn-primary ml-2",on:{click:e.copyAll}},[e._v("Copy All")])]),e._v(" "),n("hr")])}),[],!1,null,null,null);t.a=component.exports},156:function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es6_string_ends_with__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(107),core_js_modules_es6_string_ends_with__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es6_string_ends_with__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es6_string_starts_with__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(108),core_js_modules_es6_string_starts_with__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es6_string_starts_with__WEBPACK_IMPORTED_MODULE_1__),_components_TextArea_vue__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(154),unserialize=__webpack_require__(292),serialize=__webpack_require__(293);__webpack_exports__.a={components:{TextArea:_components_TextArea_vue__WEBPACK_IMPORTED_MODULE_2__.a},data:function(){return{message:"",input:"",output:""}},head:function(){return{title:"PHP serialize & unserialize",meta:[{hid:"description",name:"description",content:"PHP serialize & unserialize"}]}},methods:{encode:function(){var e;""==this.input.length&&this.showMessage("input empty"),this.message="";try{e=JSON.parse(this.input)}catch(e){return void this.showMessage("json data error.")}var t=serialize(e);t.length>0?this.output=t:this.showMessage("encode failed.")},decode:function decode(){""==this.input.length&&this.showMessage("input empty"),this.message="";var input=this.input;input.startsWith('"')&&input.endsWith('"')&&-1!=input.indexOf('"')&&(input=eval(input)),console.log(input);try{var result=unserialize(input);if(result)return void(this.output=JSON.stringify(result));this.showMessage("decode failed.")}catch(e){this.showMessage("decode failed:"+e)}},showMessage:function(e){var t=this;this.message=e,setTimeout((function(){t.message=""}),5e3)}}}},292:function(e,t,n){"use strict";(function(t){e.exports=function(data){var e="undefined"!=typeof window?window:t,n=function(e){for(var s=e.length,i=e.length-1;i>=0;i--){var code=e.charCodeAt(i);code>127&&code<=2047?s++:code>2047&&code<=65535&&(s+=2),code>=56320&&code<=57343&&i--}return s-1},r=function(t,n,r,line){throw new e[t](n,r,line)},o=function(data,e,t){for(var i=2,n=[],o=data.slice(e,e+1);o!==t;)i+e>data.length&&r("Error","Invalid"),n.push(o),o=data.slice(e+(i-1),e+i),i+=1;return[n.length,n.join("")]};return function e(data,t){var _,c,l,d,f,h,m,v,w,y,k,i,E,C,M,P,O,x,A=0,j=function(e){return e};switch(t||(t=0),c=t+2,_=data.slice(t,t+1).toLowerCase()){case"i":j=function(e){return parseInt(e,10)},A=(w=o(data,c,";"))[0],v=w[1],c+=A+1;break;case"b":j=function(e){return 0!==parseInt(e,10)},A=(w=o(data,c,";"))[0],v=w[1],c+=A+1;break;case"d":j=function(e){return parseFloat(e)},A=(w=o(data,c,";"))[0],v=w[1],c+=A+1;break;case"n":v=null;break;case"s":A=(y=o(data,c,":"))[0],k=y[1],A=(w=function(data,e,t){var i,r,o;for(o=[],i=0;i<t;i++)r=data.slice(e+(i-1),e+i),o.push(r),t-=n(r);return[o.length,o.join("")]}(data,(c+=A+2)+1,parseInt(k,10)))[0],v=w[1],c+=A+2,A!==parseInt(k,10)&&A!==v.length&&r("SyntaxError","String length mismatch");break;case"a":for(v={},A=(l=o(data,c,":"))[0],d=l[1],c+=A+2,h=parseInt(d,10),f=!0,i=0;i<h;i++)M=(C=e(data,c))[1],E=C[2],O=(P=e(data,c+=M))[1],x=P[2],c+=O,E!==i&&(f=!1),v[E]=x;if(f){for(m=new Array(h),i=0;i<h;i++)m[i]=v[i];v=m}c+=1;break;default:r("SyntaxError","Unknown / Unhandled data type(s): "+_)}return[_,c-t,j(v)]}(data+"",0)[2]}}).call(this,n(31))},293:function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function e(t){var n,o,_="",c=0,l=function(e){var t,n,o,_,c=void 0===e?"undefined":r(e);if("object"===c&&!e)return"null";if("object"===c){if(!e.constructor)return"object";for(n in(t=(o=e.constructor.toString()).match(/(\w+)\(/))&&(o=t[1].toLowerCase()),_=["boolean","number","string","array"])if(o===_[n]){c=_[n];break}}return c},d=l(t);switch(d){case"function":n="";break;case"boolean":n="b:"+(t?"1":"0");break;case"number":n=(Math.round(t)===t?"i":"d")+":"+t;break;case"string":n="s:"+(~-encodeURI(t).split(/%..|./).length+':"')+t+'"';break;case"array":case"object":for(o in n="a",t)if(t.hasOwnProperty(o)){if("function"===l(t[o]))continue;_+=e(o.match(/^[0-9]+$/)?parseInt(o,10):o)+e(t[o]),c++}n+=":"+c+":{"+_+"}";break;case"undefined":default:n="N"}return"object"!==d&&"array"!==d&&(n+=";"),n}},306:function(e,t,n){"use strict";n.r(t);var r=n(156).a,o=n(14),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h5",[e._v("PHP Serialize")]),e._v(" "),n("div",{staticClass:"form"},[n("div",{staticClass:"form-group"},[n("text-area",{model:{value:e.input,callback:function(t){e.input=t},expression:"input"}})],1),e._v(" "),n("div",{staticClass:"form-group"},[n("button",{staticClass:"btn btn-primary",on:{click:e.decode}},[e._v("decode")]),e._v(" "),n("button",{staticClass:"btn btn-warning ml-5",on:{click:e.encode}},[e._v("encode")]),e._v(" "),e.message?n("span",{staticClass:"badge badge-warning ml-3"},[e._v(e._s(e.message))]):e._e()]),e._v(" "),n("div",{staticClass:"form-group"},[n("text-area",{model:{value:e.output,callback:function(t){e.output=t},expression:"output"}})],1)])])}),[],!1,null,null,null);t.default=component.exports}}]);
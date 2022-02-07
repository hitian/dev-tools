(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{273:function(t,e,r){"use strict";var n={props:["value","readonly"],methods:{selectAll:function(){this.$refs.input_textarea.select()},copyAll:function(){var t=this.$refs.input_textarea;t.focus(),t.select();try{if(document.execCommand("copy"))return void this.showCopySuccess()}catch(t){console.log("Oops, unable to copy: "+t)}}}},o=r(52),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"ml-3 mr-3"},[r("div",{staticClass:"row"},[r("textarea",{ref:"input_textarea",staticClass:"form-control",attrs:{readonly:t.readonly,cols:"30",rows:"10"},domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)}}})]),t._v(" "),r("div",{staticClass:"text-right mt-2"},[r("button",{staticClass:"btn btn-primary",on:{click:t.selectAll}},[t._v("Select All")]),t._v(" "),r("button",{staticClass:"btn btn-primary ml-2",on:{click:t.copyAll}},[t._v("Copy All")])]),t._v(" "),r("hr")])}),[],!1,null,null,null);e.a=component.exports},275:function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(159),core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(219),core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(37),core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_2__),_components_TextArea_vue__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(273),unserialize=__webpack_require__(417),serialize=__webpack_require__(418);__webpack_exports__.a={components:{TextArea:_components_TextArea_vue__WEBPACK_IMPORTED_MODULE_3__.a},data:function(){return{message:"",input:"",output:""}},head:function(){return{title:"PHP serialize & unserialize",meta:[{hid:"description",name:"description",content:"PHP serialize & unserialize"}]}},methods:{encode:function(){var t;""==this.input.length&&this.showMessage("input empty"),this.message="";try{t=JSON.parse(this.input)}catch(t){return void this.showMessage("json data error.")}var e=serialize(t);e.length>0?this.output=e:this.showMessage("encode failed.")},decode:function decode(){""==this.input.length&&this.showMessage("input empty"),this.message="";var input=this.input;input.startsWith('"')&&input.endsWith('"')&&-1!=input.indexOf('"')&&(input=eval(input)),console.log(input);try{var result=unserialize(input);if(result)return void(this.output=JSON.stringify(result));this.showMessage("decode failed.")}catch(t){this.showMessage("decode failed:"+t)}},showMessage:function(t){var e=this;this.message=t,setTimeout((function(){e.message=""}),5e3)}}}},417:function(t,e,r){"use strict";var n=function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,i){var e=[],r=!0,n=!1,o=void 0;try{for(var c,_=t[Symbol.iterator]();!(r=(c=_.next()).done)&&(e.push(c.value),!i||e.length!==i);r=!0);}catch(t){n=!0,o=t}finally{try{!r&&_.return&&_.return()}finally{if(n)throw o}}return e}(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")};function o(t,e){var r=(/^(?:N(?=;)|[bidsSaOCrR](?=:)|[^:]+(?=:))/g.exec(t)||[])[0];if(!r)throw SyntaxError("Invalid input: "+t);switch(r){case"N":return e([null,2]);case"b":return e(function(t){var e=/^b:([01]);/.exec(t)||[],r=n(e,2),o=r[0],c=r[1];if(!c)throw SyntaxError("Invalid bool value, expected 0 or 1");return["1"===c,o.length]}(t));case"i":return e(c(t));case"d":return e(function(t){var e=/^d:(NAN|-?INF|(?:\d+\.\d*|\d*\.\d+|\d+)(?:[eE][+-]\d+)?);/.exec(t)||[],r=n(e,2),o=r[0],c=r[1];if(!c)throw SyntaxError("Expected a float value");var _=void 0;switch(c){case"NAN":_=Number.NaN;break;case"-INF":_=Number.NEGATIVE_INFINITY;break;case"INF":_=Number.POSITIVE_INFINITY;break;default:_=parseFloat(c)}return[_,o.length]}(t));case"s":return e(l(t));case"S":return e(d(t));case"a":return function(t,e){var r=/^a:(\d+):{/.exec(t)||[],c=n(r,2),_=c[0],l=c[1];if(!l)throw SyntaxError("Expected array length annotation");var d=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments[2],n=void 0,c=!1,_=void 0,l=0,d=[];r([d]);for(var i=0;i<e;i++)n=f(t),c||(c="string"==typeof n[0]),t=t.substr(n[1]),l+=n[1],_=o(t,r),t=t.substr(_[1]),l+=_[1],d[n[0]]=_[0];c&&(d=Object.assign({},d));return[d,l]}(t=t.substr(_.length),parseInt(l,10),e);if("}"!==t.charAt(d[1]))throw SyntaxError("Expected }");return[d[0],_.length+d[1]+1]}(t,e);case"O":return function(t,e){var r=/^O:(\d+):"([^"]+)":(\d+):\{/.exec(t)||[],c=n(r,4),_=c[0],l=c[2],d=c[3];if(!_)throw SyntaxError("Invalid input");if("stdClass"!==l)throw SyntaxError("Unsupported object type: "+l);var h=_.length,v=parseInt(d,10),y={};e([y]),t=t.substr(h);for(var i=0;i<v;i++){var m=f(t);t=t.substr(m[1]),h+=m[1];var E=o(t,e);t=t.substr(E[1]),h+=E[1],y[m[0]]=E[0]}if("}"!==t.charAt(0))throw SyntaxError("Expected }");return[y,h+1]}(t,e);case"C":return function(t,e){throw Error("Not yet implemented")}();case"r":case"R":return function(t,e){var r=/^[rR]:([1-9]\d*);/.exec(t)||[],o=n(r,2),c=o[0],_=o[1];if(!c)throw SyntaxError("Expected reference value");return[e.get(parseInt(_,10)-1),c.length]}(t,e);default:throw SyntaxError("Invalid or unsupported data type: "+r)}}function c(t){var e=/^i:([+-]?\d+);/.exec(t)||[],r=n(e,2),o=r[0],c=r[1];if(!c)throw SyntaxError("Expected an integer value");return[parseInt(c,10),o.length]}function _(t,e){for(var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=0,o="",c=0,_=t.length,l=!1,d=0;n<e&&c<_;){var f=t.charAt(c),code=f.charCodeAt(0),h=code>=55296&&code<=56319,v=code>=56320&&code<=57343;r&&"\\"===f&&(f=String.fromCharCode(parseInt(t.substr(c+1,2),16)),d++,c+=2),c++,n+=h||v&&l?2:code>2047?3:code>127?2:1,n+=l&&!v?1:0,o+=f,l=h}return[o,n,d]}function l(t){var e=/^s:(\d+):"/g.exec(t)||[],r=n(e,2),o=r[0],c=r[1];if(!o)throw SyntaxError("Expected a string value");var l=parseInt(c,10),d=_(t=t.substr(o.length),l),f=n(d,2),h=f[0],v=f[1];if(v!==l)throw SyntaxError("Expected string of "+l+" bytes, but got "+v);if(!(t=t.substr(h.length)).startsWith('";'))throw SyntaxError('Expected ";');return[h,o.length+h.length+2]}function d(t){var e=/^S:(\d+):"/g.exec(t)||[],r=n(e,2),o=r[0],c=r[1];if(!o)throw SyntaxError("Expected an escaped string value");var l=parseInt(c,10),d=_(t=t.substr(o.length),l,!0),f=n(d,3),h=f[0],v=f[1],y=f[2];if(v!==l)throw SyntaxError("Expected escaped string of "+l+" bytes, but got "+v);if(!(t=t.substr(h.length+2*y)).startsWith('";'))throw SyntaxError('Expected ";');return[h,o.length+h.length+2]}function f(t){try{return l(t)}catch(t){}try{return d(t)}catch(t){}try{return c(t)}catch(t){throw SyntaxError("Expected key or index")}}t.exports=function(t){try{return"string"==typeof t&&o(t,(e=[],r=function(t){return e.push(t[0]),t},r.get=function(t){if(t>=e.length)throw RangeError("Can't resolve reference "+(t+1));return e[t]},r))[0]}catch(t){return console.error(t),!1}var e,r}},418:function(t,e,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=function t(e){var r=void 0,o=void 0,c="",_=0,l=function(t){var e=void 0,r=void 0,o=void 0,c=void 0,_=void 0===t?"undefined":n(t);if("object"===_&&!t)return"null";if("object"===_){if(!t.constructor)return"object";for(r in(e=(o=t.constructor.toString()).match(/(\w+)\(/))&&(o=e[1].toLowerCase()),c=["boolean","number","string","array"])if(o===c[r]){_=c[r];break}}return _},d=l(e);switch(d){case"function":r="";break;case"boolean":r="b:"+(e?"1":"0");break;case"number":r=(Math.round(e)===e?"i":"d")+":"+e;break;case"string":r="s:"+(~-encodeURI(e).split(/%..|./).length+':"')+e+'"';break;case"array":case"object":for(o in r="a",e)if(e.hasOwnProperty(o)){if("function"===l(e[o]))continue;c+=t(o.match(/^[0-9]+$/)?parseInt(o,10):o)+t(e[o]),_++}r+=":"+_+":{"+c+"}";break;default:r="N"}return"object"!==d&&"array"!==d&&(r+=";"),r}},433:function(t,e,r){"use strict";r.r(e);var n=r(275).a,o=r(52),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h5",[t._v("PHP Serialize")]),t._v(" "),r("div",{staticClass:"form"},[r("div",{staticClass:"form-group"},[r("text-area",{model:{value:t.input,callback:function(e){t.input=e},expression:"input"}})],1),t._v(" "),r("div",{staticClass:"form-group"},[r("button",{staticClass:"btn btn-primary",on:{click:t.decode}},[t._v("decode")]),t._v(" "),r("button",{staticClass:"btn btn-warning ml-5",on:{click:t.encode}},[t._v("encode")]),t._v(" "),t.message?r("span",{staticClass:"badge badge-warning ml-3"},[t._v(t._s(t.message))]):t._e()]),t._v(" "),r("div",{staticClass:"form-group"},[r("text-area",{model:{value:t.output,callback:function(e){t.output=e},expression:"output"}})],1)])])}),[],!1,null,null,null);e.default=component.exports}}]);
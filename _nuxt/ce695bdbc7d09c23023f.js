(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{126:function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es6_string_ends_with__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(259),core_js_modules_es6_string_ends_with__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es6_string_ends_with__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es6_string_starts_with__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(260),core_js_modules_es6_string_starts_with__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es6_string_starts_with__WEBPACK_IMPORTED_MODULE_1__),unserialize=__webpack_require__(261),serialize=__webpack_require__(262);__webpack_exports__.a={data:function(){return{message:"",input:"",output:"",copy_success:!1}},methods:{encode:function(){var t;""==this.input.length&&this.showMessage("input empty"),this.message="";try{t=JSON.parse(this.input)}catch(t){return void this.showMessage("json data error.")}var e=serialize(t);e.length>0?this.output=e:this.showMessage("encode failed.")},decode:function decode(){""==this.input.length&&this.showMessage("input empty"),this.message="";var input=this.input;input.startsWith('"')&&input.endsWith('"')&&-1!=input.indexOf('"')&&(input=eval(input)),console.log(input);try{var result=unserialize(input);if(result)return void(this.output=JSON.stringify(result));this.showMessage("decode failed.")}catch(t){this.showMessage("decode failed:"+t)}},showMessage:function(t){var e=this;this.message=t,setTimeout(function(){e.message=""},5e3)},showCopySuccess:function(){var t=this;this.copy_success=!0,setTimeout(function(){t.copy_success=!1},5e3)},copyResult:function(t){var e=t.target;e.focus(),e.select();try{if(document.execCommand("copy"))return void this.showCopySuccess()}catch(t){console.log("Oops, unable to copy: "+t)}},selectAll:function(t){t.target.select()}}}},250:function(t,e,s){var n=s(49),r=s(20);t.exports=function(t,e,s){if(n(e))throw TypeError("String#"+s+" doesn't accept regex!");return String(r(t))}},251:function(t,e,s){var n=s(1)("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(s){try{return e[n]=!1,!"/./"[t](e)}catch(t){}}return!0}},259:function(t,e,s){"use strict";var n=s(13),r=s(48),i=s(250),o="".endsWith;n(n.P+n.F*s(251)("endsWith"),"String",{endsWith:function(t){var e=i(this,t,"endsWith"),s=arguments.length>1?arguments[1]:void 0,n=r(e.length),a=void 0===s?n:Math.min(r(s),n),c=String(t);return o?o.call(e,c,a):e.slice(a-c.length,a)===c}})},260:function(t,e,s){"use strict";var n=s(13),r=s(48),i=s(250),o="".startsWith;n(n.P+n.F*s(251)("startsWith"),"String",{startsWith:function(t){var e=i(this,t,"startsWith"),s=r(Math.min(arguments.length>1?arguments[1]:void 0,e.length)),n=String(t);return o?o.call(e,n,s):e.slice(s,s+n.length)===n}})},261:function(t,e,s){"use strict";(function(e){t.exports=function(t){var s="undefined"!=typeof window?window:e,n=function(t){for(var e=t.length,s=t.length-1;s>=0;s--){var n=t.charCodeAt(s);n>127&&n<=2047?e++:n>2047&&n<=65535&&(e+=2),n>=56320&&n<=57343&&s--}return e-1},r=function(t,e,n,r){throw new s[t](e,n,r)},i=function(t,e,s){for(var n=2,i=[],o=t.slice(e,e+1);o!==s;)n+e>t.length&&r("Error","Invalid"),i.push(o),o=t.slice(e+(n-1),e+n),n+=1;return[i.length,i.join("")]},o=function(t,e,s){var r,i,o;for(o=[],r=0;r<s;r++)i=t.slice(e+(r-1),e+r),o.push(i),s-=n(i);return[o.length,o.join("")]};return function t(e,s){var n,a,c,u,_,l,p,d,h,f,g,v,m,b,w,y,k,E,C=0,M=function(t){return t};switch(s||(s=0),a=s+2,n=e.slice(s,s+1).toLowerCase()){case"i":M=function(t){return parseInt(t,10)},C=(h=i(e,a,";"))[0],d=h[1],a+=C+1;break;case"b":M=function(t){return 0!==parseInt(t,10)},C=(h=i(e,a,";"))[0],d=h[1],a+=C+1;break;case"d":M=function(t){return parseFloat(t)},C=(h=i(e,a,";"))[0],d=h[1],a+=C+1;break;case"n":d=null;break;case"s":C=(f=i(e,a,":"))[0],g=f[1],C=(h=o(e,(a+=C+2)+1,parseInt(g,10)))[0],d=h[1],a+=C+2,C!==parseInt(g,10)&&C!==d.length&&r("SyntaxError","String length mismatch");break;case"a":for(d={},C=(c=i(e,a,":"))[0],u=c[1],a+=C+2,l=parseInt(u,10),_=!0,v=0;v<l;v++)w=(b=t(e,a))[1],m=b[2],k=(y=t(e,a+=w))[1],E=y[2],a+=k,m!==v&&(_=!1),d[m]=E;if(_){for(p=new Array(l),v=0;v<l;v++)p[v]=d[v];d=p}a+=1;break;default:r("SyntaxError","Unknown / Unhandled data type(s): "+n)}return[n,a-s,M(d)]}(t+"",0)[2]}}).call(this,s(35))},262:function(t,e,s){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=function t(e){var s,r,i="",o=0,a=function(t){var e,s,r,i,o=void 0===t?"undefined":n(t);if("object"===o&&!t)return"null";if("object"===o){if(!t.constructor)return"object";for(s in(e=(r=t.constructor.toString()).match(/(\w+)\(/))&&(r=e[1].toLowerCase()),i=["boolean","number","string","array"])if(r===i[s]){o=i[s];break}}return o},c=a(e);switch(c){case"function":s="";break;case"boolean":s="b:"+(e?"1":"0");break;case"number":s=(Math.round(e)===e?"i":"d")+":"+e;break;case"string":s="s:"+~-encodeURI(e).split(/%..|./).length+':"'+e+'"';break;case"array":case"object":for(r in s="a",e)if(e.hasOwnProperty(r)){if("function"===a(e[r]))continue;i+=t(r.match(/^[0-9]+$/)?parseInt(r,10):r)+t(e[r]),o++}s+=":"+o+":{"+i+"}";break;case"undefined":default:s="N"}return"object"!==c&&"array"!==c&&(s+=";"),s}},266:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("h5",[t._v("PHP Serialize")]),t._v(" "),s("div",{staticClass:"form"},[s("div",{staticClass:"form-group"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],staticClass:"form-control",attrs:{placeholder:"input here",cols:"30",rows:"10"},domProps:{value:t.input},on:{dblclick:t.selectAll,input:function(e){e.target.composing||(t.input=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-primary",on:{click:t.decode}},[t._v("decode")]),t._v(" "),s("button",{staticClass:"btn btn-warning ml-5",on:{click:t.encode}},[t._v("encode")]),t._v(" "),t.message?s("span",{staticClass:"badge badge-warning ml-3"},[t._v(t._s(t.message))]):t._e(),t._v(" "),t.copy_success?s("span",{staticClass:"badge badge-success ml-3"},[t._v("result copied to clipboard")]):t._e()]),t._v(" "),s("div",{staticClass:"form-group"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.output,expression:"output"}],staticClass:"form-control",attrs:{placeholder:"result here",cols:"30",readonly:"",rows:"15"},domProps:{value:t.output},on:{click:t.copyResult,input:function(e){e.target.composing||(t.output=e.target.value)}}})])])])};n._withStripped=!0;var r=s(126).a,i=s(10),o=Object(i.a)(r,n,[],!1,null,null,null);o.options.__file="php.vue";e.default=o.exports}}]);
webpackJsonp([4],{FaoK:function(e,t,s){"use strict";var o=s("xrTZ").Base64;t.a={data:function(){return{message:"",input:"",output:"",copy_success:!1}},methods:{encode:function(){""==this.input.length&&this.showMessage("input empty");var e=o.encode(this.input);e.length>0?this.output=e:this.showMessage("encode failed.")},decode:function(){""==this.input.length&&this.showMessage("input empty");var e=o.decode(this.input);e.length>0?this.output=e:this.showMessage("decode failed.")},showMessage:function(e){var t=this;this.message=e,setTimeout(function(){t.message=""},5e3)},showCopySuccess:function(){var e=this;this.copy_success=!0,setTimeout(function(){e.copy_success=!1},5e3)},copyResult:function(e){var t=e.target;t.focus(),t.select();try{if(document.execCommand("copy"))return void this.showCopySuccess()}catch(e){console.log("Oops, unable to copy: "+e)}},selectAll:function(e){e.target.select()}}}},cI5z:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("FaoK"),a=s("n/m7"),n=s("VU/8")(o.a,a.a,!1,null,null,null);n.options.__file="pages/base64.vue",t.default=n.exports},"n/m7":function(e,t,s){"use strict";var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("h5",[e._v("Base64")]),s("div",{staticClass:"form"},[s("div",{staticClass:"form-group"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.input,expression:"input"}],staticClass:"form-control",attrs:{placeholder:"input here",cols:"30",rows:"10"},domProps:{value:e.input},on:{dblclick:e.selectAll,input:function(t){t.target.composing||(e.input=t.target.value)}}})]),s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-primary",on:{click:e.decode}},[e._v("decode")]),s("button",{staticClass:"btn btn-warning ml-5",on:{click:e.encode}},[e._v("encode")]),e.message?s("span",{staticClass:"badge badge-warning ml-3"},[e._v(e._s(e.message))]):e._e(),e.copy_success?s("span",{staticClass:"badge badge-success ml-3"},[e._v("result copied to clipboard")]):e._e()]),s("div",{staticClass:"form-group"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.output,expression:"output"}],staticClass:"form-control",attrs:{placeholder:"result here",cols:"30",readonly:"",rows:"10"},domProps:{value:e.output},on:{click:e.copyResult,input:function(t){t.target.composing||(e.output=t.target.value)}}})])])])};o._withStripped=!0;var a={render:o,staticRenderFns:[]};t.a=a}});
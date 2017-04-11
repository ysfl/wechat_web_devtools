"use strict";function init(){var e=require("path"),t=require("fs"),r=require("url"),o=require("../../stores/projectStores.js"),i=(require("../../config/config.js"),require("../../config/dirConfig.js")),s=require("../../stores/windowStores.js");_exports={},_exports.noBrowser=["window","document","frames","self","location","navigator","localStorage","history","Caches","screen","alert","confirm","prompt","fetch","XMLHttpRequest","WebSocket","webkit","WeixinJSCore","WeixinJSBridge","Reporter","print"],_exports.whiteFileExtName={".wxml":!0,".wxss":!0,".png":!0,".jpg":!0,".jpeg":!0,".gif":!0,".svg":!0,".js":!0,".json":!0},_exports.getBaseURL=function(e){return"http://"+e.hash+".debug.open.weixin.qq.com/"},_exports.getUrlFromFilePath=function(e,t){return _exports.getBaseURL(e)+t},_exports.getProjectHashFromURL=function(e){var t=e.replace(/https?:\/\//,"").split(".");return t[0]},_exports.getProject=function(e){var t=this.getProjectHashFromURL(e);return o.getProjectByHash(t)},_exports.getFileRelativePath=function(e,t){var o=r.parse(e),i=o.pathname||"";if(i=i.replace(/^\//,""),""===i){var s=void 0;try{s=_exports.getProjectConfig(t)}catch(e){return""}var n=s.pages||[];return n[0]?n[0]+".wxml":"index.wxml"}return i.replace(/\.html$/,".wxml")},_exports.getFilePath=function(t,r){var o=this.getFileRelativePath(t,r),i=r.projectpath;return e.join(i,o)},_exports.isWxmlFile=function(e){return/\.wxml$/.test(e)},_exports.isWxssFile=function(e){return/\.wxss$/.test(e)},_exports.isWxmlURL=function(t){var o=r.parse(t),i=o.pathname,s=e.extname(i);return""===s||".html"===s||".wxml"===s},_exports.getWxImports=function(e){var t=e.match(/\<wx-import.*\<\/wx-import\>/g)||[],r=[];return t.forEach(function(e){var t=e.match(/src="(.*?)"/),o=t?t[1]:"";o&&(/$\.wxml/.test(o)||(o+=".wxml"),r.push(o))}),r},_exports.getFileNameFromUrl=function(e,t){return this.getFileRelativePath(e,t)},_exports.getPageCssFiles=function(r,o){var i=this.getFileRelativePath(r,o),s=e.basename(i),n=e.dirname(i),a=e.extname(i),p=e.join(n,s.replace(a,".wxss"));return t.existsSync(e.join(o.projectpath,p))?e.parse(p).base:""},_exports.getProjectStorage=function(r){var o=r.appid,n=r.appname,a=s.getUserInfo(),p=a?a.openid:"unknow",c=e.join(i.WeappStorage,o+"_"+n+"_"+p+".data.json"),u=void 0;try{u=t.readFileSync(c,"utf8")}catch(e){u="{}"}return JSON.parse(u)}}var _exports;init(),module.exports=_exports;
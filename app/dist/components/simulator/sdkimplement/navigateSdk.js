"use strict";function init(){var e=require("url"),t=require("../../../stores/projectStores.js"),r=require("../../../weapp/utils/projectManager.js"),i=function(t){return e.parse(t).pathname.split(".")[0].replace(/^\//,"")},a=function(e,a,s){var o=a.args.url,n=t.getCurrentProject();return r.isTabBar(n,i(o))?void s({errMsg:e+":fail can not navigate to a tabbar page"}):void this.doSimulaterActions("OPEN_NEW_WEBVIEW",{url:o,type:"navigateTo"},function(t){s(null!==t?{errMsg:e+":fail "+t}:{errMsg:e+":ok"})})},s=function(e,a,s){var o=a.args.url,n=t.getCurrentProject();if(r.isTabBar(n,i(o)))return void s({errMsg:e+":fail can not redirect to a tabbar page"});var c={},u={},g=this.state.currentWebviewID,v=this.getWebviewList(),l=v[g],p=l.isTabbar;try{c=r.getPageJSONSync(this.props.project,o)}catch(e){}var b=this.createWebviewId(),h={href:o,hideBack:p||g===this.state.topWebviewID,type:"redirectTo",prevWebviewID:l.prevWebviewID,pageJSON:c};p?(v={},v[b]=h):(delete v[g],v[b]=h),1==Object.keys(v).length&&(u.topWebviewID=b),u.currentWebviewID=b,u.list=v,this.setState(u),this.getSimulatorActions("S_CHANGE_CURRENT_WEBVIEW",null,{webviewID:b}),s({errMsg:e+":ok"})},o=function(e,a,s){var o=a.args.url,n=t.getCurrentProject();return r.isTabBar(n,i(o))?void this.doSimulaterActions("OPEN_NEW_WINDOW_WEBVIEW",{url:i(o)},function(t){s(null!==t?{errMsg:e+":fail "+t}:{errMsg:e+":ok"})}):void s({errMsg:e+":fail can not switch to no-tabBar page"})},n=function(e,i,a){var s=i.args.url,o=(t.getCurrentProject(),{});try{o=r.getPageJSONSync(this.props.project,s)}catch(e){}var n={},c=this.createWebviewId();n[c]={pageJSON:o,prevWebviewID:-1,href:s,hideBack:!0,type:"reLaunch"};var u={currentWebviewID:c,topWebviewID:c,list:n};this.setState(u),this.getSimulatorActions("S_CHANGE_CURRENT_WEBVIEW",null,{webviewID:c}),a({errMsg:e+":ok"})},c=function(e,t,r){this.doSimulaterActions("WEBVIEW_BACK",{delta:t.args.delta||1}),r({errMsg:"navigateBack:ok"})};_exports={navigateTo:a,redirectTo:s,switchTab:o,reLaunch:n,navigateBack:c}}var _exports;init(),module.exports=_exports;
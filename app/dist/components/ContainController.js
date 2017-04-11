"use strict";function init(){var t=require("../lib/react.js"),e=require("../actions/windowActions.js"),s=require("../stores/windowStores.js"),i=require("../stores/webviewStores.js"),o=require("../stores/projectStores.js"),n=(require("../actions/projectActions.js"),require("../common/log/log.js")),r=require("./setting/setting.js"),a=require("./lunch/lunch.js"),c=require("./create/create.js"),h=require("./confirm/confirm.js"),u=require("./toast/toast.js"),l=require("./Main.js"),m=require("../utils/newReport.js"),p=require("../config/config.js"),v=p.SELECT_URL_TYPE,g=p.SELECT_UNKNOW_TYPE,_=function(t){e.showTipsMsg({msg:t,type:"error"})},S=global.Win,L=void 0,f=void 0,j=void 0,T=void 0,w=t.createClass({displayName:"ContainController",getInitialState:function(){var t=!!Object.keys(s.getUserInfo()).length,e=o.getLastSelect(),i=e===v,n="",r=!1;e!==v&&e!==g&&(n=e);var a=s.getLastWinStatus()||{};return{hasLogin:t,commonUrl:i,project:n,type:e,showSetting:r,lastWinStatus:a}},componentDidMount:function(){this.state.hasLogin&&(this.state.project||this.state.commonUrl)&&this.appToMax(),s.on("UPDATA_USER_INFO",this._upDataUserInfo),i.on("NOT_LOGIN",this.goToLogin),i.on("INVALID_LOGIN",this.goToLogin),o.on("CLOSE_PROJECT",this._closeProject),o.on("DEL_PROJECT",this._delProject),s.on("SHOW_SETTING",this._showSetting),S.on("maximize",this._maximize),S.on("restore",this._restore),S.on("enter-fullscreen",this._enterFullscreen),S.on("resize",this._resize),S.on("move",this._move)},componentWillUnmount:function(){s.removeListener("UPDATA_USER_INFO",this._upDataUserInfo),i.removeListener("NOT_LOGIN",this.goToLogin),i.removeListener("INVALID_LOGIN",this.goToLogin),o.removeListener("CLOSE_PROJECT",this._closeProject),o.removeListener("DEL_PROJECT",this._delProject),s.removeListener("SHOW_SETTING",this._showSetting),S.removeListener("maximize",this._maximize),S.removeListener("restore",this._restore),S.removeListener("enter-fullscreen",this._enterFullscreen),S.removeListener("resize",this._resize),S.removeListener("move",this._move)},setLastWinStatus:function(t){this.setState({lastWinStatus:t}),(this.state.commonUrl||this.state.project)&&s.setLastWinStatus(t)},restore:function(t){var e=this,i=S.isFullscreen;clearTimeout(j),clearTimeout(T);var o=function o(){if(S.removeListener("move",e._move),S.removeListener("resize",e._resize),S.removeListener("restore",e._restore),"init"===t)S.resizeTo(nw.App.manifest.window.width,nw.App.manifest.window.height),setTimeout(function(){S.setPosition("center"),setTimeout(function(){S.on("resize",e._resize),S.on("move",e._move),S.on("restore",e._restore)},300)},500);else{var n=s.getLastWinStatus();n.isFullscreen=!1,n.status="restore";var r=void 0===n.x?100:n.x,a=void 0===n.y?100:n.y;r=r<-300?0:r,a=a<-300?0:a,S.moveTo(r,a);var c=void 0===n.width?nw.App.manifest.window.width:n.width,h=void 0===n.height?nw.App.manifest.window.height:n.height;S.resizeTo(c,h),e.setLastWinStatus(n),setTimeout(function(){S.on("resize",e._resize),S.on("move",e._move),S.on("restore",e._restore)},300)}i&&S.removeListener("restore",o)};i?(S.on("restore",o),S.leaveFullscreen()):o()},_move:function(){var t=this;clearTimeout(T),T=setTimeout(function(){var e=Object.assign({},t.state.lastWinStatus);e.x=S.x,e.y=S.y,t.setLastWinStatus(e)},500)},_resize:function(){var t=this;clearTimeout(j),j=setTimeout(function(){var e=Object.assign({},t.state.lastWinStatus);e.width=S.width,e.height=S.height,console.log("hahaha"),t.setLastWinStatus(e)},500)},_enterFullscreen:function(){var t=Object.assign({},this.state.lastWinStatus);t.isFullscreen=!0,this.setLastWinStatus(t)},_maximize:function(){clearTimeout(j),clearTimeout(T);var t=Object.assign({},this.state.lastWinStatus);t.status="max",L=S.height,f=S.width,this.setLastWinStatus(t)},_restore:function(){var t=Object.assign({},this.state.lastWinStatus);t.status="restore",t.isFullscreen=!1,S.width===f&&S.height===L&&(t.status="max"),this.setLastWinStatus(t)},_upDataUserInfo:function(t){var e=this,s=!!Object.keys(t).length;s?(this.setState({hasLogin:!0}),(this.state.project||this.state.commonUrl)&&this.appToMax()):setTimeout(function(){e.goToLogin()},50)},_delProject:function(){this.setState({project:"",commonUrl:""}),this.restore("init")},_closeProject:function(){i.setCurrentWebviewID(0),this.setState({project:"",commonUrl:""}),this.restore("init")},goToLogin:function(){this.setState({hasLogin:!1,commonUrl:"",project:""}),this.restore("init")},handleOnClick:function(t){e.bodyClick(t)},appQuit:function(){n.info("ContainController.js exit"),nw.App.quit()},appToMax:function(){var t=this.state.lastWinStatus,e=t.status;t.isFullscreen?S.enterFullscreen():"max"===e||void 0===e?S.maximize():this.restore()},appMax:function(){var t=this.state.lastWinStatus,e=t.status;"max"!==e?S.maximize():this.restore()},appMin:function(){global.Win.minimize()},goMain:function(t){var e=this;t?o.setProjectConfig(t,function(s){return s?void _(s):(e.setState({commonUrl:!1,project:t,type:t}),o.setProjectType(t.hash),void e.appToMax())}):(this.setState({commonUrl:!0,project:"",type:v}),o.setProjectType(v),this.appToMax());t?m("project_open",t.appid):m("url_open")},_showSetting:function(){this.setState({showSetting:!this.state.showSetting})},render:function(){var e=void 0;return e=this.state.hasLogin?this.state.commonUrl||this.state.project?t.createElement(l,{lastWinStatus:this.state.lastWinStatus,project:this.state.project,appQuit:this.appQuit,appMax:this.appMax,appMin:this.appMin}):t.createElement(c,{appQuit:this.appQuit,goMain:this.goMain,type:this.state.type}):t.createElement(a,{appQuit:this.appQuit}),t.createElement("div",{onClick:this.handleOnClick},e,t.createElement(r,{show:this.state.showSetting,showSetting:this._showSetting}),t.createElement(u,null),t.createElement(h,null))}});_exports=w}var _exports;init(),module.exports=_exports;
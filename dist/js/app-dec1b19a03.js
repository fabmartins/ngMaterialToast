"use strict";function applicationController($materialToast){this.moveToTrash=function(){$materialToast.show("Email moved to trash.",{showAction:!0}).then(function(){$materialToast.show("Email recovered.").then(function(){},function(){})}).catch(function(){console.log("rejected.")})}}function toastController($timeout,$scope){var _this3=this;this.show=!1,this.animationDelay=400,this.timeoutPromise=null,this.$onInit=function(){_this3.show=!0,_this3.timeoutPromise=$timeout(function(){_this3.show=!1,$timeout(function(){return _this3.deferred.reject()},_this3.animationDelay)},_this3.hideTimeout)},this.onToastClick=function(){_this3.show=!1,$timeout.cancel(_this3.timeoutPromise),$timeout(function(){return _this3.deferred.reject()},_this3.animationDelay)},this.onActionClick=function(event){event.stopPropagation(),_this3.show=!1,$timeout.cancel(_this3.timeoutPromise),$timeout(function(){return _this3.deferred.resolve()},_this3.animationDelay)}}angular.element("html").ready(function(){angular.bootstrap("html",["main"])});var mainModule=angular.module("main",["ui.router","ngMaterialToast"]).config(function($locationProvider,$materialToastProvider){$locationProvider.hashPrefix("!"),$locationProvider.html5Mode(!0),$materialToastProvider.setDefaults({hideTimeout:3e3})}),ngMaterialToastModule=angular.module("ngMaterialToast",["ngAnimate"]);mainModule.config(function($stateProvider){$stateProvider.state({name:"application",url:"/",component:"application"})}),ngMaterialToastModule.provider("$materialToast",function(){function MaterialToastFactory(defaults,$q){var _this2=this;this.toastQueue=[],this.defaults=defaults,this.hasActiveToast=!1,this.defaults.targetParent.scope().$watch(function(){return _this2.toastQueue.length>0&&!_this2.hasActiveToast},function(condition){if(!condition)return!1;_this2.hasActiveToast=!0;var toast=_this2.toastQueue.shift(),deferred=$q.defer(),compiledToast=void 0;return toast.config.targetParent.injector().invoke(function($timeout,$compile){compiledToast=$compile("<toast message='{{message}}' alignment='{{config.alignment}}' show-action='config.showAction' action-text='{{config.actionText}}' hide-timeout='config.hideTimeout' deferred='deferred'></toast>")(angular.extend(toast.config.targetParent.scope(),{message:toast.message,config:toast.config,deferred:deferred})),toast.config.targetParent.append(compiledToast)}),deferred.promise.then(function(){_this2.hasActiveToast=!1,toast.deferred.resolve(compiledToast)},function(){_this2.hasActiveToast=!1,toast.deferred.reject(compiledToast)})}),this.show=function(message,config){var deferred=$q.defer();return config=angular.isDefined(config)?angular.extend(angular.copy(defaults),{targetParent:_this2.defaults.targetParent},config):defaults,_this2.toastQueue.push({message:message,config:config,deferred:deferred}),deferred.promise.then(function(toast){return toast.remove(),$q.resolve()},function(toast){return toast.remove(),$q.reject()})}}var _this=this;this.defaults={alignment:"left bottom",showAction:!1,actionText:"Undo",hideTimeout:3e3,targetParent:angular.element("body")},this.setDefaults=function(defaultsObject){_this.defaults=angular.extend(_this.defaults,defaultsObject)},this.$get=function($q){return new MaterialToastFactory(this.defaults,$q)}}),mainModule.component("application",{controller:applicationController,templateUrl:"modules/main/components/application/application.component.html"}),ngMaterialToastModule.component("toast",{controller:toastController,templateUrl:"modules/ngMaterialToast/components/toast/toast.component.html",bindings:{message:"@",alignment:"@",showAction:"<",actionText:"@",hideTimeout:"<",deferred:"<"}});
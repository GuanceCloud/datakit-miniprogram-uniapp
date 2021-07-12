"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackActions = trackActions;

var _utils = require("../../helper/utils");

var _lifeCycle = require("../../core/lifeCycle");

var _trackEventCounts = require("../trackEventCounts");

var _trackPageActiveites = require("../trackPageActiveites");

var _enums = require("../../helper/enums");

function trackActions(lifeCycle, Vue) {
  var action = startActionManagement(lifeCycle); // New views trigger the discard of the current pending Action

  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.VIEW_CREATED, function () {
    action.discardCurrent();
  });
  var originVueExtend = Vue.extend;

  Vue.extend = function (vueOptions) {
    // methods 方法
    if (vueOptions.methods) {
      var vueMethods = Object.keys(vueOptions.methods);
      vueMethods.forEach(function (methodName) {
        clickProxy(vueOptions.methods, methodName, function (_action) {
          action.create(_action.type, _action.name);
        }, lifeCycle);
      });
    }

    var originMethods = (0, _utils.getMethods)(vueOptions);
    originMethods.forEach(function (methodName) {
      clickProxy(vueOptions, methodName, function (_action) {
        action.create(_action.type, _action.name);
      }, lifeCycle);
    });
    return originVueExtend.call(this, vueOptions);
  }; // var originPage = Page
  // Page = function (page) {
  // 	const methods = getMethods(page)
  // 	methods.forEach((methodName) => {
  // 		clickProxy(
  // 			page,
  // 			methodName,
  // 			function (_action) {
  // 				action.create(_action.type, _action.name)
  // 			},
  // 			lifeCycle,
  // 		)
  // 	})
  // 	return originPage(page)
  // }
  // var originComponent = Component
  // Component = function (component) {
  // 	const methods = getMethods(component)
  // 	methods.forEach((methodName) => {
  // 		clickProxy(component, methodName, function (_action) {
  // 			action.create(_action.type, _action.name)
  // 		})
  // 	})
  // 	return originComponent(component)
  // }


  return {
    stop: function stop() {
      action.discardCurrent(); // stopListener()
    }
  };
}

function clickProxy(page, methodName, callback, lifeCycle) {
  var oirginMethod = page[methodName];

  page[methodName] = function () {
    var result = oirginMethod.apply(this, arguments);
    var action = {};

    if ((0, _utils.isObject)(arguments[0])) {
      var currentTarget = arguments[0].currentTarget || {};
      var dataset = currentTarget.dataset || {};
      var actionType = arguments[0].type;

      if (actionType && _enums.ActionType[actionType]) {
        action.type = actionType;
        action.name = dataset.name || dataset.content || dataset.type;
        callback(action);
        lifeCycle.notify(_lifeCycle.LifeCycleEventType.PAGE_ALIAS_ACTION, true);
      } else if (methodName === 'onAddToFavorites') {
        action.type = 'click';
        action.name = '收藏 ' + '标题: ' + result.title + (result.query ? ' query: ' + result.query : '');
        callback(action);
        lifeCycle.notify(_lifeCycle.LifeCycleEventType.PAGE_ALIAS_ACTION, true);
      } else if (methodName === 'onShareAppMessage') {
        action.type = 'click';
        action.name = '转发 ' + '标题: ' + result.title + (result.path ? ' path: ' + result.path : '');
        callback(action);
        lifeCycle.notify(_lifeCycle.LifeCycleEventType.PAGE_ALIAS_ACTION, true);
      } else if (methodName === 'onShareTimeline') {
        action.type = 'click';
        action.name = '分享到朋友圈 ' + '标题: ' + result.title + (result.query ? ' query: ' + result.query : '');
        callback(action);
        lifeCycle.notify(_lifeCycle.LifeCycleEventType.PAGE_ALIAS_ACTION, true);
      } else if (methodName === 'onTabItemTap') {
        var item = arguments.length && arguments[0];
        action.type = 'click';
        action.name = 'tab ' + '名称: ' + item.text + (item.pagePath ? ' 跳转到: ' + item.pagePath : '');
        callback(action);
        lifeCycle.notify(_lifeCycle.LifeCycleEventType.PAGE_ALIAS_ACTION, true);
      }
    }

    return result;
  };
}

function startActionManagement(lifeCycle) {
  var currentAction;
  var currentIdlePageActivitySubscription;
  return {
    create: function create(type, name) {
      if (currentAction) {
        // Ignore any new action if another one is already occurring.
        return;
      }

      var pendingAutoAction = new PendingAutoAction(lifeCycle, type, name);
      currentAction = pendingAutoAction;
      currentIdlePageActivitySubscription = (0, _trackPageActiveites.waitIdlePageActivity)(lifeCycle, function (params) {
        if (params.hadActivity) {
          pendingAutoAction.complete(params.endTime);
        } else {
          pendingAutoAction.discard();
        }

        currentAction = undefined;
      });
    },
    discardCurrent: function discardCurrent() {
      if (currentAction) {
        currentIdlePageActivitySubscription.stop();
        currentAction.discard();
        currentAction = undefined;
      }
    }
  };
}

var PendingAutoAction = function PendingAutoAction(lifeCycle, type, name) {
  this.id = (0, _utils.UUID)();
  this.startClocks = (0, _utils.now)();
  this.name = name;
  this.type = type;
  this.lifeCycle = lifeCycle;
  this.eventCountsSubscription = (0, _trackEventCounts.trackEventCounts)(lifeCycle);
  this.lifeCycle.notify(_lifeCycle.LifeCycleEventType.AUTO_ACTION_CREATED, {
    id: this.id,
    startClocks: this.startClocks
  });
};

PendingAutoAction.prototype = {
  complete: function complete(endTime) {
    var eventCounts = this.eventCountsSubscription.eventCounts;
    this.lifeCycle.notify(_lifeCycle.LifeCycleEventType.AUTO_ACTION_COMPLETED, {
      counts: {
        errorCount: eventCounts.errorCount,
        longTaskCount: eventCounts.longTaskCount,
        resourceCount: eventCounts.resourceCount
      },
      duration: (0, _utils.elapsed)(this.startClocks, endTime),
      id: this.id,
      name: this.name,
      startClocks: this.startClocks,
      type: this.type
    });
    this.eventCountsSubscription.stop();
  },
  discard: function discard() {
    this.lifeCycle.notify(_lifeCycle.LifeCycleEventType.AUTO_ACTION_DISCARDED);
    this.eventCountsSubscription.stop();
  }
};